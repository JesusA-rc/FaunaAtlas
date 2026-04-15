using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class AvistamientoValidator : AbstractValidator<AvistamientoDto>
{
    public AvistamientoValidator()
    {
        RuleFor(x => x.AnimalId)
            .GreaterThan(0).WithMessage("La especie avistada es obligatoria.");

        RuleFor(x => x.Ubicacion)
            .NotEmpty().WithMessage("La ubicación es obligatoria.")
            .MaximumLength(200);

        RuleFor(x => x.Fecha)
            .NotEmpty().WithMessage("La fecha es obligatoria.")
            .LessThanOrEqualTo(DateTime.Now).WithMessage("La fecha no puede ser futura.");

        RuleFor(x => x.ReportadoPor)
            .NotEmpty().WithMessage("El nombre del informante es obligatorio.");

        RuleFor(x => x.Latitud)
            .InclusiveBetween(-90, 90).WithMessage("La latitud debe estar entre -90 y 90.");

        RuleFor(x => x.Longitud)
            .InclusiveBetween(-180, 180).WithMessage("La longitud debe estar entre -180 y 180.");

        RuleFor(x => x.Notas)
            .MaximumLength(1000).WithMessage("Las notas no pueden exceder los 1000 caracteres.");
    }
}
