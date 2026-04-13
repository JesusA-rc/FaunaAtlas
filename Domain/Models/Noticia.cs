namespace Domain.Models;

public class Noticia
{
    public int Id { get; set; }
    public int? AnimalId { get; set; }
    public int? HabitatId { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Contenido { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
    public string TagCategoria { get; set; } = string.Empty;
    public string TagRegion { get; set; } = string.Empty;
    public DateTime FechaPublicacion { get; set; }
    public string Autor { get; set; } = string.Empty;

    // Navigation properties
    public Animal? Animal { get; set; }
    public Habitat? Habitat { get; set; }
}
