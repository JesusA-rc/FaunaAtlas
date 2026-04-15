using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Extensions;

namespace API.Controllers;

public class HabitatsController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<HabitatDto>>> GetHabitats()
    {
        var habitats = await context.Habitats.ToListAsync();
        return Ok(habitats.Select(h => h.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HabitatDto>> GetHabitat(int id)
    {
        var habitat = await context.Habitats.FindAsync(id);
        if (habitat == null) return NotFound();

        return habitat.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<HabitatDto>> CreateHabitat(HabitatDto habitatDto)
    {
        if (await context.Habitats.AnyAsync(h => h.Nombre == habitatDto.Nombre))
            return BadRequest("Ya existe un hábitat con este nombre.");

        var habitat = new Habitat();
        habitatDto.UpdateEntity(habitat);

        context.Habitats.Add(habitat);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetHabitat), new { id = habitat.Id }, habitat.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHabitat(int id, HabitatDto habitatDto)
    {
        var habitat = await context.Habitats.FindAsync(id);
        if (habitat == null) return NotFound();

        if (await context.Habitats.AnyAsync(h => h.Id != id && h.Nombre == habitatDto.Nombre))
            return BadRequest("Ya existe otro hábitat con este nombre.");

        habitatDto.UpdateEntity(habitat);
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
