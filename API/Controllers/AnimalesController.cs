using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class AnimalesController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AnimalDto>>> GetAnimales()
    {
        return await context.Animales
            .Select(a => new AnimalDto
            {
                Id = a.Id,
                NombreComun = a.NombreComun,
                NombreCientifico = a.NombreCientifico,
                Clase = a.Clase,
                EstadoConservacion = a.EstadoConservacion,
                Dieta = a.Dieta,
                Descripcion = a.Descripcion,
                ImagenUrl = a.ImagenUrl,
                HabitatId = a.HabitatId
            })
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AnimalDto>> GetAnimal(int id)
    {
        var animal = await context.Animales.FindAsync(id);

        if (animal == null) return NotFound();

        return new AnimalDto
        {
            Id = animal.Id,
            NombreComun = animal.NombreComun,
            NombreCientifico = animal.NombreCientifico,
            Clase = animal.Clase,
            EstadoConservacion = animal.EstadoConservacion,
            Dieta = animal.Dieta,
            Descripcion = animal.Descripcion,
            ImagenUrl = animal.ImagenUrl,
            HabitatId = animal.HabitatId
        };
    }

    [HttpPost]
    public async Task<ActionResult<AnimalDto>> CreateAnimal(AnimalDto animalDto)
    {
        if (!await context.Habitats.AnyAsync(h => h.Id == animalDto.HabitatId))
        {
            return BadRequest("El Habitat especificado no existe.");
        }

        var animal = new Animal
        {
            NombreComun = animalDto.NombreComun,
            NombreCientifico = animalDto.NombreCientifico,
            Clase = animalDto.Clase,
            EstadoConservacion = animalDto.EstadoConservacion,
            Dieta = animalDto.Dieta,
            Descripcion = animalDto.Descripcion,
            ImagenUrl = animalDto.ImagenUrl,
            HabitatId = animalDto.HabitatId
        };

        context.Animales.Add(animal);
        await context.SaveChangesAsync();

        animalDto.Id = animal.Id;
        return CreatedAtAction(nameof(GetAnimal), new { id = animal.Id }, animalDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAnimal(int id, AnimalDto animalDto)
    {
        if (id != animalDto.Id) return BadRequest();

        var animal = await context.Animales.FindAsync(id);
        if (animal == null) return NotFound();

        if (animal.HabitatId != animalDto.HabitatId && !await context.Habitats.AnyAsync(h => h.Id == animalDto.HabitatId))
        {
            return BadRequest("El Habitat especificado no existe.");
        }

        animal.NombreComun = animalDto.NombreComun;
        animal.NombreCientifico = animalDto.NombreCientifico;
        animal.Clase = animalDto.Clase;
        animal.EstadoConservacion = animalDto.EstadoConservacion;
        animal.Dieta = animalDto.Dieta;
        animal.Descripcion = animalDto.Descripcion;
        animal.ImagenUrl = animalDto.ImagenUrl;
        animal.HabitatId = animalDto.HabitatId;

        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAnimal(int id)
    {
        var animal = await context.Animales.FindAsync(id);
        if (animal == null) return NotFound();

        context.Animales.Remove(animal);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
