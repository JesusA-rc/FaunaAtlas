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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Avistamiento>()
            .Property(a => a.Latitud)
            .HasPrecision(18, 10);

        modelBuilder.Entity<Avistamiento>()
            .Property(a => a.Longitud)
            .HasPrecision(18, 10);
    }
}
