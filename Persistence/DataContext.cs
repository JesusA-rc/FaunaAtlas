using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Habitat> Habitats { get; set; } = null!;
    public DbSet<Animal> Animales { get; set; } = null!;
    public DbSet<Avistamiento> Avistamientos { get; set; } = null!;
    public DbSet<Noticia> Noticias { get; set; } = null!;
    public DbSet<Usuario> Usuarios { get; set; } = null!;
    public DbSet<Zoo> Zoos { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.UserName)
            .IsUnique();

        modelBuilder.Entity<Avistamiento>()
            .Property(a => a.Latitud)
            .HasPrecision(18, 10);

        modelBuilder.Entity<Avistamiento>()
            .Property(a => a.Longitud)
            .HasPrecision(18, 10);

        modelBuilder.Entity<Noticia>()
            .HasOne(n => n.Animal)
            .WithMany()
            .HasForeignKey(n => n.AnimalId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Noticia>()
            .HasOne(n => n.Habitat)
            .WithMany()
            .HasForeignKey(n => n.HabitatId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Zoo>()
            .HasMany(z => z.Animales)
            .WithMany(a => a.Zoos)
            .UsingEntity(j => j.ToTable("ZooAnimal"));
    }
}
