/**
 * cSpell: disable
 */

class Pawn extends Piece {
  constructor(name, type, img) {
    Piece.call(name, type, img);
  }

  constructor(name, type) {
    Piece.call(name, type)
  }
}