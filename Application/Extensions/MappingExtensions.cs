using Application.DTOs;
using Domain.Models;

namespace Application.Extensions;

public static class MappingExtensions
{
    public static AnimalDto ToDto(this Animal animal)
    {
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
            HabitatId = animal.HabitatId,
            HabitatNombre = animal.Habitat?.Nombre
        };
    }

    public static void UpdateEntity(this AnimalDto dto, Animal animal)
    {
        animal.NombreComun = dto.NombreComun;
        animal.NombreCientifico = dto.NombreCientifico;
        animal.Clase = dto.Clase;
        animal.EstadoConservacion = dto.EstadoConservacion;
        animal.Dieta = dto.Dieta;
        animal.Descripcion = dto.Descripcion;
        animal.ImagenUrl = dto.ImagenUrl;
        animal.HabitatId = dto.HabitatId;
    }

    public static HabitatDto ToDto(this Habitat habitat)
    {
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

    public static void UpdateEntity(this HabitatDto dto, Habitat habitat)
    {
        habitat.Nombre = dto.Nombre;
        habitat.Tipo = dto.Tipo;
        habitat.Clima = dto.Clima;
        habitat.Region = dto.Region;
        habitat.Descripcion = dto.Descripcion;
        habitat.ImagenUrl = dto.ImagenUrl;
    }

    public static AvistamientoDto ToDto(this Avistamiento a)
    {
        return new AvistamientoDto
        {
            Id = a.Id,
            AnimalId = a.AnimalId,
            AnimalNombre = a.Animal?.NombreComun ?? "Desconocido",
            Ubicacion = a.Ubicacion,
            Fecha = a.Fecha,
            ReportadoPor = a.ReportadoPor,
            Notas = a.Notas,
            Latitud = a.Latitud,
            Longitud = a.Longitud,
            Animal = a.Animal?.ToDto()
        };
    }

    public static void UpdateEntity(this AvistamientoDto dto, Avistamiento a)
    {
        a.AnimalId = dto.AnimalId;
        a.Ubicacion = dto.Ubicacion;
        a.Fecha = dto.Fecha;
        a.ReportadoPor = dto.ReportadoPor;
        a.Notas = dto.Notas;
        a.Latitud = dto.Latitud;
        a.Longitud = dto.Longitud;
    }

    public static NoticiaDto ToDto(this Noticia n)
    {
        return new NoticiaDto
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
        };
    }

    public static void UpdateEntity(this NoticiaDto dto, Noticia n)
    {
        n.AnimalId = dto.AnimalId;
        n.HabitatId = dto.HabitatId;
        n.Titulo = dto.Titulo;
        n.Contenido = dto.Contenido;
        n.ImagenUrl = dto.ImagenUrl;
        n.TagCategoria = dto.TagCategoria;
        n.TagRegion = dto.TagRegion;
        n.FechaPublicacion = dto.FechaPublicacion;
        n.Autor = dto.Autor;
    }

    public static ZooDto ToDto(this Zoo zoo)
    {
        return new ZooDto
        {
            Id = zoo.Id,
            Nombre = zoo.Nombre,
            Ubicacion = zoo.Ubicacion,
            Descripcion = zoo.Descripcion,
            ImagenUrl = zoo.ImagenUrl,
            Animales = zoo.Animales?.Select(a => a.ToDto()).ToList()
        };
    }

    public static void UpdateEntity(this ZooDto dto, Zoo zoo)
    {
        zoo.Nombre = dto.Nombre;
        zoo.Ubicacion = dto.Ubicacion;
        zoo.Descripcion = dto.Descripcion;
        zoo.ImagenUrl = dto.ImagenUrl;
    }
}
