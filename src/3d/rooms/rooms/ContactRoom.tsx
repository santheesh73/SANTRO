'use client';

import React from 'react';
import { ContactPlinth } from '../exhibits/ContactPlinth';

/**
 * ContactRoom — Contact Pavilion & Dialogue Initiation
 *
 * Sits at the culmination of the interior journey (Z: -17.5m to -21.0m)
 * framing the monolithic travertine central plinth and double-height rear glass curtain wall.
 */
export function ContactRoom() {
  return (
    <group name="Room_Contact">
      {/* Central Contact Plinth Tablet at Z: -18.5m, resting atop 0.69m travertine plinth */}
      <ContactPlinth position={[0.0, 0.69, -18.5]} />
    </group>
  );
}
