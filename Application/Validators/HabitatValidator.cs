using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class HabitatValidator : AbstractValidator<HabitatDto>
{
    public HabitatValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre del hábitat es obligatorio.")
            .MaximumLength(100);

        RuleFor(x => x.Tipo)
            .NotEmpty().WithMessage("El tipo de hábitat es obligatorio.");

        RuleFor(x => x.Clima)
            .NotEmpty().WithMessage("El clima es obligatorio.");

        RuleFor(x => x.Region)
            .NotEmpty().WithMessage("La región es obligatoria.");

        RuleFor(x => x.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria.")
            .MinimumLength(5);

        RuleFor(x => x.ImagenUrl)
            .Must(uri => string.IsNullOrEmpty(uri) || Uri.TryCreate(uri, UriKind.Absolute, out _))
            .WithMessage("La URL de la imagen no es válida.");
    }
}
