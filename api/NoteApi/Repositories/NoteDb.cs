namespace NoteApi.Repositories
{
  using Microsoft.EntityFrameworkCore;
  using NoteApi.Models;

  class NoteDb(DbContextOptions<NoteDb> options) : DbContext(options)
  {
    public DbSet<Note> Notes => Set<Note>();
  }
}