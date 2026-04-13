namespace Domain.Models;

public class Habitat 
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string Clima { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }

    public ICollection<Animal> Animales { get; set; } = new List<Animal>();
}