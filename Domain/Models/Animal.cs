namespace Domain.Models;

public class Animal
{
    public int Id { get; set; }
    public int HabitatId { get; set; }
    public string NombreComun { get; set; } = string.Empty;
    public string NombreCientifico { get; set; } = string.Empty;
    public string Clase { get; set; } = string.Empty;
    public string EstadoConservacion { get; set; } = string.Empty;
    public string Dieta { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }

    public Habitat Habitat { get; set; } = null!;
    public ICollection<Avistamiento> Avistamientos { get; set; } = new List<Avistamiento>();
    public ICollection<Zoo> Zoos { get; set; } = new List<Zoo>();
}
