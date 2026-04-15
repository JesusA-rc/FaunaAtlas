using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class AnimalValidator : AbstractValidator<AnimalDto>
{
    public AnimalValidator()
    {
        RuleFor(x => x.NombreComun)
            .NotEmpty().WithMessage("El nombre común es obligatorio.")
            .MaximumLength(100).WithMessage("El nombre común no puede exceder los 100 caracteres.");

        RuleFor(x => x.NombreCientifico)
            .NotEmpty().WithMessage("El nombre científico es obligatorio.")
            .MaximumLength(150).WithMessage("El nombre científico no puede exceder los 150 caracteres.");

        RuleFor(x => x.Clase)
            .NotEmpty().WithMessage("La clase es obligatoria.");

        RuleFor(x => x.EstadoConservacion)
            .NotEmpty().WithMessage("El estado de conservación es obligatorio.");

        RuleFor(x => x.Dieta)
            .NotEmpty().WithMessage("La dieta es obligatoria.");

        RuleFor(x => x.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria.")
            .MinimumLength(10).WithMessage("La descripción debe tener al menos 10 caracteres.");

        RuleFor(x => x.HabitatId)
            .GreaterThan(0).WithMessage("Se debe seleccionar un hábitat válido.");
            
        RuleFor(x => x.ImagenUrl)
            .Must(uri => string.IsNullOrEmpty(uri) || Uri.TryCreate(uri, UriKind.Absolute, out _))
            .WithMessage("La URL de la imagen no es válida.");
    }
}
