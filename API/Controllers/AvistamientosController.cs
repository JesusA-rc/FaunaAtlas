using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class AvistamientosController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AvistamientoDto>>> GetAvistamientos()
    {
        return await context.Avistamientos
            .Select(a => new AvistamientoDto
            {
                Id = a.Id,
                AnimalId = a.AnimalId,
                Ubicacion = a.Ubicacion,
                Fecha = a.Fecha,
                ReportadoPor = a.ReportadoPor,
                Notas = a.Notas,
                Latitud = a.Latitud,
                Longitud = a.Longitud
            })
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AvistamientoDto>> GetAvistamiento(int id)
    {
        var avistamiento = await context.Avistamientos.FindAsync(id);

        if (avistamiento == null) return NotFound();

        return new AvistamientoDto
        {
            Id = avistamiento.Id,
            AnimalId = avistamiento.AnimalId,
            Ubicacion = avistamiento.Ubicacion,
            Fecha = avistamiento.Fecha,
            ReportadoPor = avistamiento.ReportadoPor,
            Notas = avistamiento.Notas,
            Latitud = avistamiento.Latitud,
            Longitud = avistamiento.Longitud
        };
    }

    [HttpPost]
    public async Task<ActionResult<AvistamientoDto>> CreateAvistamiento(AvistamientoDto avistamientoDto)
    {
        if (!await context.Animales.AnyAsync(a => a.Id == avistamientoDto.AnimalId))
        {
            return BadRequest("El Animal especificado no existe.");
        }

        var avistamiento = new Avistamiento
        {
            AnimalId = avistamientoDto.AnimalId,
            Ubicacion = avistamientoDto.Ubicacion,
            Fecha = avistamientoDto.Fecha,
            ReportadoPor = avistamientoDto.ReportadoPor,
            Notas = avistamientoDto.Notas,
            Latitud = avistamientoDto.Latitud,
            Longitud = avistamientoDto.Longitud
        };

        context.Avistamientos.Add(avistamiento);
        await context.SaveChangesAsync();

        avistamientoDto.Id = avistamiento.Id;
        return CreatedAtAction(nameof(GetAvistamiento), new { id = avistamiento.Id }, avistamientoDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAvistamiento(int id, AvistamientoDto avistamientoDto)
    {
        if (id != avistamientoDto.Id) return BadRequest();

        var avistamiento = await context.Avistamientos.FindAsync(id);
        if (avistamiento == null) return NotFound();

        if (avistamiento.AnimalId != avistamientoDto.AnimalId 
            && !await context.Animales.AnyAsync(a => a.Id == avistamientoDto.AnimalId))
        {
            return BadRequest("El Animal especificado no existe.");
        }

        avistamiento.AnimalId = avistamientoDto.AnimalId;
        avistamiento.Ubicacion = avistamientoDto.Ubicacion;
        avistamiento.Fecha = avistamientoDto.Fecha;
        avistamiento.ReportadoPor = avistamientoDto.ReportadoPor;
        avistamiento.Notas = avistamientoDto.Notas;
        avistamiento.Latitud = avistamientoDto.Latitud;
        avistamiento.Longitud = avistamientoDto.Longitud;

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
