using Application.DTOs;
using Application.Extensions;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ZoosController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ZooDto>>> GetZoos()
    {
        var zoos = await context.Zoos
            .Include(z => z.Animales)
            .ToListAsync();

        return Ok(zoos.Select(z => z.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ZooDto>> GetZoo(int id)
    {
        var zoo = await context.Zoos
            .Include(z => z.Animales)
            .FirstOrDefaultAsync(z => z.Id == id);

        if (zoo == null) return NotFound();

        return zoo.ToDto();
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ZooDto>> CreateZoo(ZooDto zooDto)
    {
        var zoo = new Zoo();
        zooDto.UpdateEntity(zoo);

        context.Zoos.Add(zoo);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetZoo), new { id = zoo.Id }, zoo.ToDto());
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateZoo(int id, ZooDto zooDto)
    {
        var zoo = await context.Zoos.FindAsync(id);
        if (zoo == null) return NotFound();

        zooDto.UpdateEntity(zoo);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteZoo(int id)
    {
        var zoo = await context.Zoos.FindAsync(id);
        if (zoo == null) return NotFound();

        context.Zoos.Remove(zoo);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("{zooId}/animales/{animalId}")]
    public async Task<IActionResult> AddAnimalToZoo(int zooId, int animalId)
    {
        var zoo = await context.Zoos
            .Include(z => z.Animales)
            .FirstOrDefaultAsync(z => z.Id == zooId);
        
        if (zoo == null) return NotFound("Zoológico no encontrado.");

        var animal = await context.Animales.FindAsync(animalId);
        if (animal == null) return NotFound("Animal no encontrado.");

        if (zoo.Animales.Any(a => a.Id == animalId))
            return BadRequest("El animal ya está registrado en este zoológico.");

        zoo.Animales.Add(animal);
        await context.SaveChangesAsync();

        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{zooId}/animales/{animalId}")]
    public async Task<IActionResult> RemoveAnimalFromZoo(int zooId, int animalId)
    {
        var zoo = await context.Zoos
            .Include(z => z.Animales)
            .FirstOrDefaultAsync(z => z.Id == zooId);
        
        if (zoo == null) return NotFound("Zoológico no encontrado.");

        var animal = zoo.Animales.FirstOrDefault(a => a.Id == animalId);
        if (animal == null) return NotFound("El animal no está en este zoológico.");

        zoo.Animales.Remove(animal);
        await context.SaveChangesAsync();

        return Ok();
    }
}
