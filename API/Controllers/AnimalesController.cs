using Application.DTOs;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Extensions;

namespace API.Controllers;

public class AnimalesController(DataContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AnimalDto>>> GetAnimales()
    {
        var animals = await context.Animales
            .Include(a => a.Habitat)
            .ToListAsync();
            
        return Ok(animals.Select(a => a.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AnimalDto>> GetAnimal(int id)
    {
        var animal = await context.Animales
            .Include(a => a.Habitat)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (animal == null) return NotFound();

        return animal.ToDto();
    }

    [HttpPost]
    [HttpPost]
    public async Task<ActionResult<AnimalDto>> CreateAnimal(AnimalDto animalDto)
    {
        if (!await context.Habitats.AnyAsync(h => h.Id == animalDto.HabitatId))
            return BadRequest("El Habitat especificado no existe.");

        if (await context.Animales.AnyAsync(a => a.NombreComun == animalDto.NombreComun 
            || a.NombreCientifico == animalDto.NombreCientifico))
            return BadRequest("Ya existe una especie con este Nombre Común o Nombre Científico.");

        var animal = new Animal();
        animalDto.UpdateEntity(animal);

        context.Animales.Add(animal);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAnimal), new { id = animal.Id }, animal.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAnimal(int id, AnimalDto animalDto)
    {
        var animal = await context.Animales.FindAsync(id);
        if (animal == null) return NotFound();

        if (animal.HabitatId != animalDto.HabitatId && !await context.Habitats.AnyAsync(h => h.Id == animalDto.HabitatId))
            return BadRequest("El Habitat especificado no existe.");

        animalDto.UpdateEntity(animal);
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
