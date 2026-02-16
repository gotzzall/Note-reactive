using Microsoft.EntityFrameworkCore;
using NoteApi.Models;
using NoteApi.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<NoteDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAll", p =>
      p.AllowAnyOrigin()
       .AllowAnyMethod()
       .AllowAnyHeader());
});
builder.Services.AddOpenApiDocument(config =>
{
  config.DocumentName = "TodoAPI";
  config.Title = "TodoAPI v1";
  config.Version = "v1";
});
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
  app.UseOpenApi();
  app.UseSwaggerUi(config =>
  {
    config.DocumentTitle = "TodoAPI";
    config.Path = "/swagger";
    config.DocumentPath = "/swagger/{documentName}/swagger.json";
    config.DocExpansion = "list";
  });
}

app.MapGet("/noteitems", async (NoteDb db) =>
    await db.Notes.ToListAsync());

app.MapGet("/noteitems/{id}", async (int id, NoteDb db) =>
    await db.Notes.FindAsync(id)
        is Note note
            ? Results.Ok(note)
            : Results.NotFound());

app.MapPost("/noteitems", async (Note note, NoteDb db) =>
{
  db.Notes.Add(note);
  await db.SaveChangesAsync();

  return Results.Created($"/noteitems/{note.Id}", note);
});

app.MapPut("/noteitems/{id}", async (int id, Note inputNote, NoteDb db) =>
{
  var note = await db.Notes.FindAsync(id);

  if (note is null) return Results.NotFound();

  note.Notes = inputNote.Notes;

  await db.SaveChangesAsync();

  return Results.NoContent();
});

app.MapDelete("/noteitems/{id}", async (int id, NoteDb db) =>
{
  if (await db.Notes.FindAsync(id) is Note note)
  {
    db.Notes.Remove(note);
    await db.SaveChangesAsync();
    return Results.NoContent();
  }

  return Results.NotFound();
});
app.UseCors("AllowAll");
app.Run();