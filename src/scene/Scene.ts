export default interface Scene {

  /**
   * Initialize the scene.
   */
  initialize(): void;

  /**
   * Update the scene.
   */
  update(): void;

  /**
   * Destroy the scene.
   */
  destroy(): void;

}