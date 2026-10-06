'use client';

import React, { useEffect, useRef } from 'react';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { getRoomForJourneyProgress, PORTFOLIO_ROOMS } from './RoomRegistry';
import { RoomId } from './types';

// Room Implementations
import { ExteriorRoom } from './rooms/ExteriorRoom';
import { EntranceRoom } from './rooms/EntranceRoom';
import { FoyerRoom } from './rooms/FoyerRoom';
import { GalleryRoom } from './rooms/GalleryRoom';
import { ProjectStudioRoom } from './rooms/ProjectStudioRoom';
import { EngineeringLabRoom } from './rooms/EngineeringLabRoom';
import { ArchiveRoom } from './rooms/ArchiveRoom';
import { StudyRoom } from './rooms/StudyRoom';
import { ContactRoom } from './rooms/ContactRoom';
import { TerraceRoom } from './rooms/TerraceRoom';

interface RoomSystemProps {
  visible?: boolean;
}

/**
 * SANTRO M8 — Master Portfolio Room System Coordinator
 *
 * Orchestrates the 10 data-driven portfolio rooms inside the 3D architectural scene.
 * Implements the core spatial sequence:
 * EXTERIOR -> ENTRANCE -> FOYER -> GALLERY -> PROJECT STUDIO -> ENGINEERING LAB -> ARCHIVE -> STUDY -> CONTACT -> TERRACE
 *
 * Automatically tracks journey progression and synchronizes active room states with useHouseStore.
 */
export function RoomSystem({ visible = true }: RoomSystemProps) {
  const cinematicProgress = useHouseStore((state) => state.cinematicProgress);
  const setCurrentRoom = useHouseStore((state) => state.setCurrentRoom);
  const lastActiveRoomRef = useRef<RoomId>('exterior');

  // Track active room and synchronize with global store
  useEffect(() => {
    const activeRoom = getRoomForJourneyProgress(cinematicProgress);
    if (activeRoom.id !== lastActiveRoomRef.current) {
      lastActiveRoomRef.current = activeRoom.id;
      if (typeof setCurrentRoom === 'function') {
        setCurrentRoom(activeRoom.id);
      }
    }
  }, [cinematicProgress, setCurrentRoom]);

  if (!visible) return null;

  return (
    <group name="ROOM_SYSTEM_MASTER_ROOT">
      {/* 01. Exterior Identity Prelude */}
      <ExteriorRoom />

      {/* 02. Entrance Portal & Threshold */}
      <EntranceRoom />

      {/* 03. Foyer Vestibule — About & Profile */}
      <FoyerRoom />

      {/* 04. Gallery Circulation Corridor — Curatorial Selected Work */}
      <GalleryRoom />

      {/* 05. Project Studio — 7 Verified Portfolio Projects */}
      <ProjectStudioRoom />

      {/* 06. Engineering Lab — Technical Stack & System Workspace */}
      <EngineeringLabRoom />

      {/* 07. Archive — Proof, SIH Win, Hackathons & Milestones */}
      <ArchiveRoom />

      {/* 08. Study — Principles: BUILD, THINK, EXPLORE, REFINE */}
      <StudyRoom />

      {/* 09. Contact Pavilion — Direct Dialogue & Verified Channels */}
      <ContactRoom />

      {/* 10. Rear Terrace & Vista — Contemplative Architectural Horizon */}
      <TerraceRoom />
    </group>
  );
}
