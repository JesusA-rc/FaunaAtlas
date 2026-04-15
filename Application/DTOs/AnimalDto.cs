namespace Application.DTOs;

public class AnimalDto
{
    public int Id { get; set; }
    public string NombreComun { get; set; } = string.Empty;
    public string NombreCientifico { get; set; } = string.Empty;
    public string Clase { get; set; } = string.Empty;
    public string EstadoConservacion { get; set; } = string.Empty;
    public string Dieta { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
    public int HabitatId { get; set; }
    public string? HabitatNombre { get; set; }
}
