export default interface Scene {

  /**
   * Initialize the scene.
   */
  init(): void;

  /**
   * Update the scene.
   */
  update(): void;

  
  draw(): void;

  /**
   * Destroy the scene.
   */
  destroy(): void;

}