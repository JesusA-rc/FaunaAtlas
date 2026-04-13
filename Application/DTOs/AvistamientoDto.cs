namespace Application.DTOs;

public class AvistamientoDto
{
    public int Id { get; set; }
    public int AnimalId { get; set; }
    public string Ubicacion { get; set; } = string.Empty;
    public DateTime Fecha { get; set; }
    public string ReportadoPor { get; set; } = string.Empty;
    public string Notas { get; set; } = string.Empty;
    public double Latitud { get; set; }
    public double Longitud { get; set; }
}
