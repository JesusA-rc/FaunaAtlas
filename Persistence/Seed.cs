using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public static class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (!context.Usuarios.Any())
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("123456"));
            var passwordSalt = hmac.Key;

            var usuarios = new List<Usuario>
            {
                new Usuario 
                { 
                    UserName = "admin", 
                    Email = "admin@fauna.com", 
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    NombreCompleto = "Administrador del Atlas",
                    Rol = UserRole.Admin
                },
                new Usuario 
                { 
                    UserName = "juan_explorador", 
                    Email = "juan@correo.com", 
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    NombreCompleto = "Juan Pérez",
                    Rol = UserRole.Usuario
                }
            };

            await context.Usuarios.AddRangeAsync(usuarios);
            await context.SaveChangesAsync();
        }

        if (!context.Habitats.Any())
        {
            var habitatsList = new List<Habitat>
            {
                new Habitat { Nombre = "Bosque Templado", Tipo = "Bosque", Clima = "Fresco", Region = "Sierra Madre", Descripcion = "Pinos y encinos.", ImagenUrl = "https://images.unsplash.com/photo-1448375240581-5625687a3b91?w=800" },
                new Habitat { Nombre = "Selva Tropical", Tipo = "Selva", Clima = "Cálido Húmedo", Region = "Sureste", Descripcion = "Gran biodiversidad tropical.", ImagenUrl = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800" },
                new Habitat { Nombre = "Desierto de Sonora", Tipo = "Desierto", Clima = "Árido", Region = "Noroeste", Descripcion = "Zonas áridas y sahuaros.", ImagenUrl = "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800" },
                new Habitat { Nombre = "Marino", Tipo = "Océano", Clima = "Variable", Region = "Mar de Cortés", Descripcion = "Riqueza marina inigualable.", ImagenUrl = "https://images.unsplash.com/photo-1518837697461-704ec396759d?w=800" },
                new Habitat { Nombre = "Humedal", Tipo = "Pantano", Clima = "Templado Húmedo", Region = "Tabasco", Descripcion = "Ecosistemas inundables.", ImagenUrl = "https://images.unsplash.com/photo-1508197148814-24707d711f77?w=800" }
            };

            await context.Habitats.AddRangeAsync(habitatsList);
            await context.SaveChangesAsync();
        }

        var habitats = await context.Habitats.ToListAsync();

        if (!context.Animales.Any())
        {
            var animalesList = new List<Animal>
            {
                new Animal { HabitatId = habitats[1].Id, NombreComun = "Jaguar", NombreCientifico = "Panthera onca", Clase = "Mamífero", EstadoConservacion = "En Peligro", Dieta = "Carnívoro", Descripcion = "Gran felino americano.", ImagenUrl = "https://images.unsplash.com/photo-1541013444641-59f77f98d789?w=800" },
                new Animal { HabitatId = habitats[0].Id, NombreComun = "Lobo Gris Mexicano", NombreCientifico = "Canis lupus baileyi", Clase = "Mamífero", EstadoConservacion = "En Peligro Crítico", Dieta = "Carnívoro", Descripcion = "Subespecie pequeña.", ImagenUrl = "https://images.unsplash.com/photo-1590420485404-f86d22b8abf8?w=800" },
                new Animal { HabitatId = habitats[1].Id, NombreComun = "Quetzal", NombreCientifico = "Pharomachrus mocinno", Clase = "Ave", EstadoConservacion = "Casi Amenazada", Dieta = "Omnívoro", Descripcion = "Ave sagrada.", ImagenUrl = "https://images.unsplash.com/photo-1619183492728-ce444f6f8902?w=800" },
                new Animal { HabitatId = habitats[2].Id, NombreComun = "Águila Real", NombreCientifico = "Aquila chrysaetos", Clase = "Ave", EstadoConservacion = "Amenazada", Dieta = "Carnívoro", Descripcion = "Símbolo nacional.", ImagenUrl = "https://images.unsplash.com/photo-1563223771-5fe406354cd1?w=800" },
                new Animal { HabitatId = habitats[3].Id, NombreComun = "Vaquita Marina", NombreCientifico = "Phocoena sinus", Clase = "Mamífero", EstadoConservacion = "En Peligro Crítico", Dieta = "Carnívoro", Descripcion = "Marsopa más pequeña.", ImagenUrl = "https://images.unsplash.com/photo-1550747528-cdb86942e132?w=800" },
                new Animal { HabitatId = habitats[4].Id, NombreComun = "Ajolote", NombreCientifico = "Ambystoma mexicanum", Clase = "Anfibio", EstadoConservacion = "En Peligro Crítico", Dieta = "Carnívoro", Descripcion = "Monstruo de agua.", ImagenUrl = "https://images.unsplash.com/photo-1571501679680-de32f141ad11?w=800" },
                new Animal { HabitatId = habitats[0].Id, NombreComun = "Mariposa Monarca", NombreCientifico = "Danaus plexippus", Clase = "Insecto", EstadoConservacion = "Amenazada", Dieta = "Herbívoro", Descripcion = "Migración masiva.", ImagenUrl = "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800" },
                new Animal { HabitatId = habitats[2].Id, NombreComun = "Berrendo", NombreCientifico = "Antilocapra americana", Clase = "Mamífero", EstadoConservacion = "Amenazada", Dieta = "Herbívoro", Descripcion = "Antílope americano.", ImagenUrl = "https://images.unsplash.com/photo-1516233758813-a38d024919c5?w=800" },
                new Animal { HabitatId = habitats[1].Id, NombreComun = "Mono Zaraguato", NombreCientifico = "Alouatta palliata", Clase = "Mamífero", EstadoConservacion = "Amenazada", Dieta = "Herbívoro", Descripcion = "Mono aullador.", ImagenUrl = "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800" },
                new Animal { HabitatId = habitats[1].Id, NombreComun = "Tapir", NombreCientifico = "Tapirus bairdii", Clase = "Mamífero", EstadoConservacion = "En Peligro", Dieta = "Herbívoro", Descripcion = "Arquitecto de selvas.", ImagenUrl = "https://images.unsplash.com/photo-1557053503-0c252e5c8093?w=800" },
                new Animal { HabitatId = habitats[3].Id, NombreComun = "Tortuga Carey", NombreCientifico = "Eretmochelys imbricata", Clase = "Reptil", EstadoConservacion = "En Peligro Crítico", Dieta = "Omnívoro", Descripcion = "Tortuga marina bella.", ImagenUrl = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800" },
                new Animal { HabitatId = habitats[4].Id, NombreComun = "Flamenco Caribeño", NombreCientifico = "Phoenicopterus ruber", Clase = "Ave", EstadoConservacion = "Preocupación Menor", Dieta = "Omnívoro", Descripcion = "Ave rosada.", ImagenUrl = "https://images.unsplash.com/photo-1470755008296-2939845775eb?w=800" },
                new Animal { HabitatId = habitats[0].Id, NombreComun = "Puma", NombreCientifico = "Puma concolor", Clase = "Mamífero", EstadoConservacion = "Preocupación Menor", Dieta = "Carnívoro", Descripcion = "León de montaña.", ImagenUrl = "https://images.unsplash.com/photo-1589441148825-bb3585d8a7bc?w=800" },
                new Animal { HabitatId = habitats[1].Id, NombreComun = "Ocelote", NombreCientifico = "Leopardus pardalis", Clase = "Mamífero", EstadoConservacion = "Amenazada", Dieta = "Carnívoro", Descripcion = "Pequeño jaguar.", ImagenUrl = "https://images.unsplash.com/photo-1516934024747-5972856c4d2e?w=800" },
                new Animal { HabitatId = habitats[1].Id, NombreComun = "Guacamaya Roja", NombreCientifico = "Ara macao", Clase = "Ave", EstadoConservacion = "Amenazada", Dieta = "Omnívoro", Descripcion = "Lapa roja.", ImagenUrl = "https://images.unsplash.com/photo-1552728089-57bdde30fc3a?w=800" },
                new Animal { HabitatId = habitats[3].Id, NombreComun = "Ballena Gris", NombreCientifico = "Eschrichtius robustus", Clase = "Mamífero", EstadoConservacion = "Preocupación Menor", Dieta = "Filtrador", Descripcion = "Visitante invernal.", ImagenUrl = "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800" },
                new Animal { HabitatId = habitats[4].Id, NombreComun = "Manatí del Caribe", NombreCientifico = "Trichechus manatus", Clase = "Mamífero", EstadoConservacion = "En Peligro", Dieta = "Herbívoro", Descripcion = "Vaca marina.", ImagenUrl = "https://images.unsplash.com/photo-1594916328320-c208466ed567?w=800" },
                new Animal { HabitatId = habitats[0].Id, NombreComun = "Oso Negro", NombreCientifico = "Ursus americanus", Clase = "Mamífero", EstadoConservacion = "Sujeta a protección", Dieta = "Omnívoro", Descripcion = "Gran plantígrado.", ImagenUrl = "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800" },
                new Animal { HabitatId = habitats[2].Id, NombreComun = "Perrito de la Pradera", NombreCientifico = "Cynomys ludovicianus", Clase = "Mamífero", EstadoConservacion = "Amenazada", Dieta = "Herbívoro", Descripcion = "Ardilla de tierra.", ImagenUrl = "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=800" },
                new Animal { HabitatId = habitats[1].Id, NombreComun = "Coatí", NombreCientifico = "Nasua narica", Clase = "Mamífero", EstadoConservacion = "Preocupación Menor", Dieta = "Omnívoro", Descripcion = "Tejón mexicano.", ImagenUrl = "https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?w=800" }
            };

            await context.Animales.AddRangeAsync(animalesList);
            await context.SaveChangesAsync();
        }

        var animales = await context.Animales.ToListAsync();

        if (!context.Avistamientos.Any())
        {
            var avistamientos = new List<Avistamiento>();
            var random = new Random();
            for (int i = 0; i < 25; i++)
            {
                var animal = animales[random.Next(animales.Count)];
                avistamientos.Add(new Avistamiento
                {
                    AnimalId = animal.Id,
                    Ubicacion = $"Ubicación Secreta {i + 1}",
                    Fecha = DateTime.Now.AddDays(-random.Next(1, 100)),
                    ReportadoPor = $"Usuario_{random.Next(100, 999)}",
                    Notas = $"Observación registrada de {animal.NombreComun} en su hábitat natural.",
                    Latitud = 19.4326 + (random.NextDouble() - 0.5) * 5,
                    Longitud = -99.1332 + (random.NextDouble() - 0.5) * 5
                });
            }

            await context.Avistamientos.AddRangeAsync(avistamientos);
            await context.SaveChangesAsync();
        }

        if (await context.Noticias.CountAsync() < 11)
        {
            // Clear existing if any to avoid duplicates in this specific seed run
            context.Noticias.RemoveRange(context.Noticias);
            await context.SaveChangesAsync();

            var noticias = new List<Noticia>
            {
                new Noticia
                {
                    AnimalId = animales.FirstOrDefault(a => a.NombreComun == "Jaguar")?.Id,
                    Titulo = "El jaguar regresa a zonas donde había desaparecido",
                    Contenido = "Tras años de esfuerzos de conservación, se han registrado avistamientos en corredores biológicos clave.",
                    ImagenUrl = "https://images.unsplash.com/photo-1541013444641-59f77f98d789?w=800",
                    TagCategoria = "Conservación",
                    TagRegion = "México",
                    FechaPublicacion = DateTime.Now.AddDays(-2),
                    Autor = "Dr. Leopoldo Silva"
                },
                new Noticia
                {
                    HabitatId = habitats.FirstOrDefault(h => h.Nombre == "Marino")?.Id,
                    Titulo = "Museo de Historia Natural incorpora fósil de mosasaurio",
                    Contenido = "Un impresionante ejemplar de mosasaurio descubierto en el norte del país se une a la colección permanente.",
                    ImagenUrl = "https://images.unsplash.com/photo-1518837697461-704ec396759d?w=800",
                    TagCategoria = "Descubrimiento",
                    TagRegion = "Marina",
                    FechaPublicacion = DateTime.Now.AddDays(-10),
                    Autor = "Paleontóloga Elena Ríos"
                },
                new Noticia
                {
                    AnimalId = animales.FirstOrDefault(a => a.NombreComun == "Ajolote")?.Id,
                    Titulo = "Nuevas medidas para la protección del Ajolote",
                    Contenido = "El gobierno local anuncia un plan integral para restaurar los canales de Xochimilco.",
                    ImagenUrl = "https://images.unsplash.com/photo-1571501679680-de32f141ad11?w=800",
                    TagCategoria = "Conservación",
                    TagRegion = "México",
                    FechaPublicacion = DateTime.Now.AddDays(-1),
                    Autor = "Secretaría de Medio Ambiente"
                },
                new Noticia
                {
                    AnimalId = animales.FirstOrDefault(a => a.NombreComun == "Mariposa Monarca")?.Id,
                    Titulo = "Récord de mariposas monarca en los santuarios de Michoacán",
                    Contenido = "Se reporta un aumento del 35% en la superficie ocupada por las monarcas respecto al año pasado.",
                    ImagenUrl = "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
                    TagCategoria = "Éxito",
                    TagRegion = "México",
                    FechaPublicacion = DateTime.Now.AddDays(-5),
                    Autor = "Bio. Roberto Mendez"
                },
                new Noticia
                {
                    AnimalId = animales.FirstOrDefault(a => a.NombreComun == "Vaquita Marina")?.Id,
                    Titulo = "Nuevas patrullas para la protección de la vaquita marina",
                    Contenido = "Marina mexicana intensifica vigilancia en el alto Golfo de California para retirar redes ilegales.",
                    ImagenUrl = "https://images.unsplash.com/photo-1550747528-cdb86942e132?w=800",
                    TagCategoria = "Conservación",
                    TagRegion = "Baja California",
                    FechaPublicacion = DateTime.Now.AddDays(-3),
                    Autor = "Canal 44 Noticia"
                },
                new Noticia
                {
                    AnimalId = animales.FirstOrDefault(a => a.NombreComun == "Lobo Gris Mexicano")?.Id,
                    Titulo = "Liberación exitosa de una pareja de lobos grises",
                    Contenido = "Tras nacer en cautiverio, dos ejemplares regresaron a las montañas de la Sierra Madre Occidental.",
                    ImagenUrl = "https://images.unsplash.com/photo-1590420485404-f86d22b8abf8?w=800",
                    TagCategoria = "Reintroducción",
                    TagRegion = "Norte de México",
                    FechaPublicacion = DateTime.Now.AddDays(-7),
                    Autor = "Fauna Silvestre Regional"
                },
                new Noticia
                {
                    HabitatId = habitats.FirstOrDefault(h => h.Nombre == "Selva Tropical")?.Id,
                    Titulo = "Descubren nueva especie de rana en la Selva Lacandona",
                    Contenido = "Científicos de la UNAM catalogan un nuevo anfibio con piel translúcida y canto único.",
                    ImagenUrl = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
                    TagCategoria = "Descubrimiento",
                    TagRegion = "Chiapas",
                    FechaPublicacion = DateTime.Now.AddDays(-12),
                    Autor = "Gaceta UNAM"
                },
                new Noticia
                {
                    Titulo = "Drones de visión térmica mejoran el conteo de fauna",
                    Contenido = "La nueva tecnología permite realizar censos sin estresar a las especies del desierto.",
                    ImagenUrl = "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800",
                    TagCategoria = "Tecnología",
                    TagRegion = "Global",
                    FechaPublicacion = DateTime.Now.AddDays(-4),
                    Autor = "Tech Wildlife"
                },
                new Noticia
                {
                    HabitatId = habitats.FirstOrDefault(h => h.Nombre == "Humedal")?.Id,
                    Titulo = "Restauración del ecosistema de manglares en Tabasco",
                    Contenido = "Comunidades locales plantan más de 50,000 brotes para combatir la erosión costera.",
                    ImagenUrl = "https://images.unsplash.com/photo-1508197148814-24707d711f77?w=800",
                    TagCategoria = "Sustentabilidad",
                    TagRegion = "Tabasco",
                    FechaPublicacion = DateTime.Now.AddDays(-8),
                    Autor = "EcosistemasMX"
                },
                new Noticia
                {
                    AnimalId = animales.FirstOrDefault(h => h.NombreComun == "Oso Negro")?.Id,
                    Titulo = "Avistamiento inusual de oso negro cerca de Monterrey",
                    Contenido = "Autoridades piden a la población asegurar la basura para evitar conflictos con la vida silvestre.",
                    ImagenUrl = "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800",
                    TagCategoria = "Urbanismo",
                    TagRegion = "Nuevo León",
                    FechaPublicacion = DateTime.Now.AddDays(-1),
                    Autor = "Protección Civil"
                },
                new Noticia
                {
                    HabitatId = habitats.FirstOrDefault(h => h.Nombre == "Marino")?.Id,
                    Titulo = "Arrecifes de coral muestran signos de sanación",
                    Contenido = "Baja en la temperatura del agua permite que los corales recuperen su color y vitalidad.",
                    ImagenUrl = "https://images.unsplash.com/photo-1518837697461-704ec396759d?w=800",
                    TagCategoria = "Ecología",
                    TagRegion = "Marina",
                    FechaPublicacion = DateTime.Now.AddDays(-15),
                    Autor = "Océanos Vivos"
                }
            };

            await context.Noticias.AddRangeAsync(noticias);
            await context.SaveChangesAsync();
        }
    }
}
