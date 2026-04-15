using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class HabitatsController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<HabitatDto>>> GetHabitats()
    {
        return await context.Habitats
            .Select(h => new HabitatDto
            {
                Id = h.Id,
                Nombre = h.Nombre,
                Tipo = h.Tipo,
                Clima = h.Clima,
                Region = h.Region,
                Descripcion = h.Descripcion,
                ImagenUrl = h.ImagenUrl
            })
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HabitatDto>> GetHabitat(int id)
    {
        var habitat = await context.Habitats.FindAsync(id);

        if (habitat == null) return NotFound();

        return new HabitatDto
        {
            Id = habitat.Id,
            Nombre = habitat.Nombre,
            Tipo = habitat.Tipo,
            Clima = habitat.Clima,
            Region = habitat.Region,
            Descripcion = habitat.Descripcion,
            ImagenUrl = habitat.ImagenUrl
        };
    }

    [HttpPost]
    public async Task<ActionResult<HabitatDto>> CreateHabitat(HabitatDto habitatDto)
    {
        if (await context.Habitats.AnyAsync(h => h.Nombre == habitatDto.Nombre))
        {
            return BadRequest("Ya existe un hábitat con este nombre.");
        }

        var habitat = new Habitat
        {
            Nombre = habitatDto.Nombre,
            Tipo = habitatDto.Tipo,
            Clima = habitatDto.Clima,
            Region = habitatDto.Region,
            Descripcion = habitatDto.Descripcion,
            ImagenUrl = habitatDto.ImagenUrl
        };

        context.Habitats.Add(habitat);
        await context.SaveChangesAsync();

        habitatDto.Id = habitat.Id;
        return CreatedAtAction(nameof(GetHabitat), new { id = habitat.Id }, habitatDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHabitat(int id, HabitatDto habitatDto)
    {
        if (id != habitatDto.Id) return BadRequest();

        var habitat = await context.Habitats.FindAsync(id);
        if (habitat == null) return NotFound();

        if (await context.Habitats.AnyAsync(h => h.Id != id && h.Nombre == habitatDto.Nombre))
        {
            return BadRequest("Ya existe otro hábitat con este nombre.");
        }

        habitat.Nombre = habitatDto.Nombre;
        habitat.Tipo = habitatDto.Tipo;
        habitat.Clima = habitatDto.Clima;
        habitat.Region = habitatDto.Region;
        habitat.Descripcion = habitatDto.Descripcion;
        habitat.ImagenUrl = habitatDto.ImagenUrl;

        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHabitat(int id)
    {
        var habitat = await context.Habitats.FindAsync(id);
        if (habitat == null) return NotFound();

        context.Habitats.Remove(habitat);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
