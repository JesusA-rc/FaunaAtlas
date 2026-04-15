using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Extensions;

namespace API.Controllers;

public class NoticiasController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoticiaDto>>> GetNoticias()
    {
        var news = await context.Noticias.ToListAsync();
        return Ok(news.Select(n => n.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NoticiaDto>> GetNoticia(int id)
    {
        var noticia = await context.Noticias.FindAsync(id);
        if (noticia == null) return NotFound();

        return noticia.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<NoticiaDto>> CreateNoticia(NoticiaDto noticiaDto)
    {
        if (noticiaDto.AnimalId.HasValue && !await context.Animales.AnyAsync(a => a.Id == noticiaDto.AnimalId))
            return BadRequest("El Animal especificado no existe.");

        if (noticiaDto.HabitatId.HasValue && !await context.Habitats.AnyAsync(h => h.Id == noticiaDto.HabitatId))
            return BadRequest("El Habitat especificado no existe.");

        var noticia = new Noticia();
        noticiaDto.UpdateEntity(noticia);

        context.Noticias.Add(noticia);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNoticia), new { id = noticia.Id }, noticia.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNoticia(int id, NoticiaDto noticiaDto)
    {
        var noticia = await context.Noticias.FindAsync(id);
        if (noticia == null) return NotFound();

        if (noticiaDto.AnimalId.HasValue && !await context.Animales.AnyAsync(a => a.Id == noticiaDto.AnimalId))
            return BadRequest("El Animal especificado no existe.");

        if (noticiaDto.HabitatId.HasValue && !await context.Habitats.AnyAsync(h => h.Id == noticiaDto.HabitatId))
            return BadRequest("El Habitat especificado no existe.");

        noticiaDto.UpdateEntity(noticia);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNoticia(int id)
    {
        var noticia = await context.Noticias.FindAsync(id);
        if (noticia == null) return NotFound();

        context.Noticias.Remove(noticia);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
