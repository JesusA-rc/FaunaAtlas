namespace Domain.Models;

public class Zoo
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Ubicacion { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }

    public ICollection<Animal> Animales { get; set; } = new List<Animal>();
}
