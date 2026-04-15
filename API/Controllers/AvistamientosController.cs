using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Extensions;

namespace API.Controllers;

public class AvistamientosController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AvistamientoDto>>> GetAvistamientos()
    {
        var sightings = await context.Avistamientos
            .Include(a => a.Animal)
            .ThenInclude(an => an.Habitat)
            .OrderByDescending(a => a.Fecha)
            .ToListAsync();
            
        return Ok(sightings.Select(a => a.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AvistamientoDto>> GetAvistamiento(int id)
    {
        var sighting = await context.Avistamientos
            .Include(a => a.Animal)
            .ThenInclude(an => an.Habitat)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (sighting == null) return NotFound();

        return sighting.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<AvistamientoDto>> CreateAvistamiento(AvistamientoDto avistamientoDto)
    {
        if (!await context.Animales.AnyAsync(a => a.Id == avistamientoDto.AnimalId))
            return BadRequest("El Animal especificado no existe.");

        var avistamiento = new Avistamiento();
        avistamientoDto.UpdateEntity(avistamiento);

        context.Avistamientos.Add(avistamiento);
        await context.SaveChangesAsync();

        var created = await context.Avistamientos
            .Include(a => a.Animal)
            .FirstAsync(a => a.Id == avistamiento.Id);

        return CreatedAtAction(nameof(GetAvistamiento), new { id = created.Id }, created.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAvistamiento(int id, AvistamientoDto avistamientoDto)
    {
        var avistamiento = await context.Avistamientos.FindAsync(id);
        if (avistamiento == null) return NotFound();

        if (avistamiento.AnimalId != avistamientoDto.AnimalId 
            && !await context.Animales.AnyAsync(a => a.Id == avistamientoDto.AnimalId))
            return BadRequest("El Animal especificado no existe.");

        avistamientoDto.UpdateEntity(avistamiento);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAvistamiento(int id)
    {
        var avistamiento = await context.Avistamientos.FindAsync(id);
        if (avistamiento == null) return NotFound();

        context.Avistamientos.Remove(avistamiento);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
