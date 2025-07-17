package dnd.perso.playerclient.exception;

public class DatabaseError extends Exception {
  @Override
  public String getMessage() {
    return "An error occurred while accessing the database. Please try again later.";
  }
}
