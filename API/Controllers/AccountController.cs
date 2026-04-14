using System.Security.Cryptography;
using System.Text;
using API.Services;
using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly TokenService _tokenService;

    public AccountController(DataContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("El nombre de usuario ya existe");

        using var hmac = new HMACSHA512();

        var user = new Usuario
        {
            UserName = registerDto.Username.ToLower(),
            Email = registerDto.Email,
            NombreCompleto = registerDto.NombreCompleto,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key,
            Rol = UserRole.Usuario
        };

        _context.Usuarios.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user),
            NombreCompleto = user.NombreCompleto,
            Rol = user.Rol
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _context.Usuarios
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

        if (user == null) return Unauthorized("Usuario no válido");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Contraseña no válida");
        }

        user.UltimoLogin = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user),
            NombreCompleto = user.NombreCompleto,
            Rol = user.Rol
        };
    }

    private async Task<bool> UserExists(string username)
    {
        return await _context.Usuarios.AnyAsync(x => x.UserName == username.ToLower());
    }
}
