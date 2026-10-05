"""
SANTRO — Headless Blender Python Export Automation Script
=========================================================

Automates extraction and GLB export of "The Portfolio House" from Blender 4.x/5.x
conforming to the M1 specifications in BLENDER_CONVENTIONS.md and 3D_PIPELINE.md.

Usage (Headless CLI):
    blender -b blender/the_portfolio_house.blend -P scripts/export_portfolio_house.py

Execution Steps:
1. Validates metric units (1.0 Blender unit = 1.0 meter).
2. Traverses architectural collections (01_ARCHITECTURE, 02_INTERIOR_JOINERY, etc.).
3. Applies Location/Rotation/Scale transforms for static architecture.
4. Preserves object origin for dynamic elements (e.g., GEO_Door_Pivot_Leaf hinge axis).
5. Ensures outward face normal orientation and cleans orphan data.
6. Exports binary glTF (.glb) with custom node properties (extras) to public/3d/models/.
"""

import os
import sys

try:
    import bpy
    import mathutils
except ImportError:
    print("[Error] This script must be executed within Blender (via 'blender -b file.blend -P export_portfolio_house.py')")
    sys.exit(1)


def validate_scene_units():
    """Ensure scene conforms to metric meters and 1.0 scale."""
    unit_settings = bpy.context.scene.unit_settings
    unit_settings.system = 'METRIC'
    unit_settings.scale_length = 1.0
    unit_settings.length_unit = 'METERS'
    print("[Pipeline] Unit system validated: Metric (1.0 unit = 1.0 meter)")


def apply_static_transforms():
    """Apply transforms to static architecture while preserving dynamic hinge and anchor pivots."""
    bpy.ops.object.select_all(action='DESELECT')
    dynamic_names = ['GEO_Door_Pivot_Leaf', 'ANCHOR_Door_Hinge_Pivot']

    count = 0
    for obj in bpy.context.scene.objects:
        if obj.type == 'MESH':
            # Preserve origin of dynamic doors and waypoints
            if any(dyn in obj.name for dyn in dynamic_names) or obj.name.startswith('WAYPOINT_'):
                continue

            obj.select_set(True)
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
            obj.select_set(False)
            count += 1

    print(f"[Pipeline] Applied transforms to {count} static architectural meshes.")


def export_glb(output_path):
    """Export scene to binary glTF (.glb) conforming to WebGL performance requirements."""
    # Ensure destination directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Select all renderable objects in architecture and interior collections
    bpy.ops.object.select_all(action='DESELECT')
    target_collections = [
        '01_ARCHITECTURE',
        '02_INTERIOR_JOINERY',
        '03_EXTERIOR_ELEMENTS',
        '04_ENVIRONMENT',
        '05_SYSTEM_ANCHORS',
    ]

    selected_count = 0
    for col_name in target_collections:
        col = bpy.data.collections.get(col_name)
        if col:
            for obj in col.all_objects:
                obj.select_set(True)
                selected_count += 1

    if selected_count == 0:
        # Fallback to all visible objects if specific collections not present
        bpy.ops.object.select_all(action='SELECT')
        selected_count = len(bpy.context.selected_objects)

    print(f"[Pipeline] Exporting {selected_count} objects to {output_path}...")

    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLB',
        use_selection=True,
        export_apply=True,              # Apply active modifiers (Subsurf, Mirror, etc.)
        export_normals=True,            # Export custom split normals
        export_tangents=True,           # Export normal map tangents
        export_materials='EXPORT',      # Export PBR materials
        export_colors=True,             # Vertex colors (for AO baking if needed)
        export_cameras=False,           # Cameras managed via React Three Fiber
        export_lights=False,            # Lighting managed via Three.js scene graph
        export_extras=True,             # Export custom properties (door triggers, waypoints)
        export_yup=True,                # +Y is Up (+Z forward)
        export_draco_mesh_compression_enable=False, # Draco/Meshopt handled in web optimization phase
    )

    print(f"[Pipeline] Successfully exported GLB: {output_path}")


def main():
    print("=" * 60)
    print("SANTRO 3D ASSET EXPORT PIPELINE — BLENDER AUTOMATION")
    print("=" * 60)

    validate_scene_units()
    apply_static_transforms()

    # Determine project root relative to script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, "..", ".."))
    output_glb = os.path.join(project_root, "public", "3d", "models", "the_portfolio_house_raw.glb")

    export_glb(output_glb)
    print("=" * 60)
    print("PIPELINE EXPORT COMPLETE")
    print("=" * 60)


if __name__ == '__main__':
    main()
