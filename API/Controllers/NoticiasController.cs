using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class NoticiasController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoticiaDto>>> GetNoticias()
    {
        return await context.Noticias
            .Select(n => new NoticiaDto
            {
                Id = n.Id,
                AnimalId = n.AnimalId,
                HabitatId = n.HabitatId,
                Titulo = n.Titulo,
                Contenido = n.Contenido,
                ImagenUrl = n.ImagenUrl,
                TagCategoria = n.TagCategoria,
                TagRegion = n.TagRegion,
                FechaPublicacion = n.FechaPublicacion,
                Autor = n.Autor
            })
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NoticiaDto>> GetNoticia(int id)
    {
        var noticia = await context.Noticias.FindAsync(id);

        if (noticia == null) return NotFound();

        return new NoticiaDto
        {
            Id = noticia.Id,
            AnimalId = noticia.AnimalId,
            HabitatId = noticia.HabitatId,
            Titulo = noticia.Titulo,
            Contenido = noticia.Contenido,
            ImagenUrl = noticia.ImagenUrl,
            TagCategoria = noticia.TagCategoria,
            TagRegion = noticia.TagRegion,
            FechaPublicacion = noticia.FechaPublicacion,
            Autor = noticia.Autor
        };
    }

    [HttpPost]
    public async Task<ActionResult<NoticiaDto>> CreateNoticia(NoticiaDto noticiaDto)
    {
        if (noticiaDto.AnimalId.HasValue && !await context.Animales.AnyAsync(a => a.Id == noticiaDto.AnimalId))
        {
            return BadRequest("El Animal especificado no existe.");
        }

        if (noticiaDto.HabitatId.HasValue && !await context.Habitats.AnyAsync(h => h.Id == noticiaDto.HabitatId))
        {
            return BadRequest("El Habitat especificado no existe.");
        }

        var noticia = new Noticia
        {
            AnimalId = noticiaDto.AnimalId,
            HabitatId = noticiaDto.HabitatId,
            Titulo = noticiaDto.Titulo,
            Contenido = noticiaDto.Contenido,
            ImagenUrl = noticiaDto.ImagenUrl,
            TagCategoria = noticiaDto.TagCategoria,
            TagRegion = noticiaDto.TagRegion,
            FechaPublicacion = noticiaDto.FechaPublicacion,
            Autor = noticiaDto.Autor
        };

        context.Noticias.Add(noticia);
        await context.SaveChangesAsync();

        noticiaDto.Id = noticia.Id;
        return CreatedAtAction(nameof(GetNoticia), new { id = noticia.Id }, noticiaDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNoticia(int id, NoticiaDto noticiaDto)
    {
        if (id != noticiaDto.Id) return BadRequest();

        var noticia = await context.Noticias.FindAsync(id);
        if (noticia == null) return NotFound();

        if (noticiaDto.AnimalId.HasValue && !await context.Animales.AnyAsync(a => a.Id == noticiaDto.AnimalId))
        {
            return BadRequest("El Animal especificado no existe.");
        }

        if (noticiaDto.HabitatId.HasValue && !await context.Habitats.AnyAsync(h => h.Id == noticiaDto.HabitatId))
        {
            return BadRequest("El Habitat especificado no existe.");
        }

        noticia.AnimalId = noticiaDto.AnimalId;
        noticia.HabitatId = noticiaDto.HabitatId;
        noticia.Titulo = noticiaDto.Titulo;
        noticia.Contenido = noticiaDto.Contenido;
        noticia.ImagenUrl = noticiaDto.ImagenUrl;
        noticia.TagCategoria = noticiaDto.TagCategoria;
        noticia.TagRegion = noticiaDto.TagRegion;
        noticia.FechaPublicacion = noticiaDto.FechaPublicacion;
        noticia.Autor = noticiaDto.Autor;

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
