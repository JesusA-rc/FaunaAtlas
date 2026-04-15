using Application.DTOs;
using FluentValidation;

namespace Application.Validators;

public class NoticiaValidator : AbstractValidator<NoticiaDto>
{
    public NoticiaValidator()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("El título es obligatorio.")
            .MaximumLength(200);

        RuleFor(x => x.Contenido)
            .NotEmpty().WithMessage("el contenido es obligatorio.")
            .MinimumLength(20).WithMessage("El contenido debe tener al menos 20 caracteres.");

        RuleFor(x => x.TagCategoria)
            .NotEmpty().WithMessage("La categoría es obligatoria.");

        RuleFor(x => x.TagRegion)
            .NotEmpty().WithMessage("La región es obligatoria.");

        RuleFor(x => x.Autor)
            .NotEmpty().WithMessage("El autor es obligatorio.");
            
        RuleFor(x => x.FechaPublicacion)
            .NotEmpty().WithMessage("La fecha de publicación es obligatoria.");
    }
}
