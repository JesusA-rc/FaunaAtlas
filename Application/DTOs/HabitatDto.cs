namespace Application.DTOs;

public class HabitatDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string Clima { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
}
