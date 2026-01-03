export type ProjectMetric = { label: string; value: string };

export type Project = {
    slug: string;
    title: string;
    year: string;
    location: string;
    type: string;
    role: string;
    tags: string[];
    shortDesc: string;
    problem: string;
    solution: string;
    tools: string[];
    images: string[];
    metrics: ProjectMetric[];
};

export const projects: Project[] = [
    {
        slug: "skyline-residence",
        title: "Skyline Residence",
        year: "2025",
        location: "Dallas, TX",
        type: "Residential",
        role: "Architect Engineer (Concept → Visualization)",
        tags: ["Residential", "Modern", "Facade", "3D Walkthrough"],
        shortDesc:
            "A modern hillside home designed for daylight, privacy, and clean structural logic—presented as a cinematic 3D walkthrough.",
        problem:
            "The client wanted a premium modern home with large openings and skyline views, but the site required privacy and a structure that stays efficient and buildable.",
        solution:
            "Created a stepped massing strategy with layered terraces. The facade uses controlled glazing zones and screens for privacy. The structural grid aligns with room modules to reduce complexity and keep spans realistic.",
        tools: ["AutoCAD", "Revit", "SketchUp", "Blender", "Enscape/Lumion"],
        images: [
            "/projects/skyline-residence/01-hero.jpg",
            "/projects/skyline-residence/02-interior.jpg",
            "/projects/skyline-residence/03-exterior-night.jpg",
        ],
        metrics: [
            { label: "Area", value: "3,200 sq ft" },
            { label: "Timeline", value: "6 weeks concept + viz" },
            { label: "Key Focus", value: "Light, privacy, buildability" },
        ],
    },

    {
        slug: "aura-commercial-hub",
        title: "Aura Commercial Hub",
        year: "2024",
        location: "Arlington, TX",
        type: "Commercial",
        role: "Architect Engineer (Massing + Facade + Structure)",
        tags: ["Commercial", "Mixed-use", "Parametric", "Facade"],
        shortDesc:
            "A mixed-use commercial hub with a rational structural system and a dynamic facade optimized for shading and identity.",
        problem:
            "The project needed a strong commercial identity while managing heat gain, pedestrian flow, and an efficient structural system for retail + office stacks.",
        solution:
            "Designed a clean podium-and-tower composition. Introduced a facade rhythm that increases shading on high-exposure sides. The core + column grid supports flexible leasing modules and reduces transfer structures.",
        tools: ["Revit", "Rhino", "Grasshopper (optional)", "Blender", "Photoshop"],
        images: [
            "/projects/aura-commercial-hub/01-hero.jpg",
            "/projects/aura-commercial-hub/02-facade.jpg",
            "/projects/aura-commercial-hub/03-plaza.jpg",
        ],
        metrics: [
            { label: "Program", value: "Retail + Office" },
            { label: "Floors", value: "8" },
            { label: "Key Focus", value: "Shading + modular structure" },
        ],
    },

    {
        slug: "green-courtyard-school",
        title: "Green Courtyard School",
        year: "2024",
        location: "Fort Worth, TX",
        type: "Institutional",
        role: "Architect Engineer (Planning + Daylight Strategy)",
        tags: ["Institutional", "Sustainable", "Courtyard", "Daylighting"],
        shortDesc:
            "A courtyard-based school concept built around natural ventilation, safe circulation, and daylight-driven learning spaces.",
        problem:
            "The design had to support safe student movement, reduce energy load, and create calm spaces that stay bright without glare.",
        solution:
            "Used a central courtyard as the environmental and social heart. Classrooms are arranged in shaded wings with controlled openings. Circulation is intuitive, with passive ventilation paths and shaded outdoor learning zones.",
        tools: ["AutoCAD", "Revit", "SketchUp", "Lumion/Enscape"],
        images: [
            "/projects/green-courtyard-school/01-hero.jpg",
            "/projects/green-courtyard-school/02-courtyard.jpg",
            "/projects/green-courtyard-school/03-classroom.jpg",
        ],
        metrics: [
            { label: "Strategy", value: "Courtyard ventilation" },
            { label: "Experience", value: "Safe + intuitive movement" },
            { label: "Key Focus", value: "Daylight & comfort" },
        ],
    },

    {
        slug: "riverfront-cultural-center",
        title: "Riverfront Cultural Center",
        year: "2025",
        location: "Austin, TX",
        type: "Cultural",
        role: "Architect Engineer (Concept + Exhibition Story)",
        tags: ["Cultural", "Public", "Form", "3D Motion"],
        shortDesc:
            "A public cultural center concept shaped by circulation, river views, and a dramatic interior void—shown in 3D fly-through.",
        problem:
            "The building needed to guide visitors smoothly through exhibitions while framing river views and keeping the structure elegant and feasible.",
        solution:
            "Designed a ‘loop’ circulation narrative around a central void. Program blocks anchor the structure at edges, allowing a clear span strategy and strong wayfinding with visual cues to the landscape.",
        tools: ["Rhino", "Blender", "Unreal/Lumion (optional)", "Illustrator"],
        images: [
            "/projects/riverfront-cultural-center/01-hero.jpg",
            "/projects/riverfront-cultural-center/02-atrium.jpg",
            "/projects/riverfront-cultural-center/03-river-view.jpg",
        ],
        metrics: [
            { label: "Feature", value: "Central atrium void" },
            { label: "Story", value: "Loop circulation narrative" },
            { label: "Key Focus", value: "Views + visitor flow" },
        ],
    },

    {
        slug: "minimal-loft-interior",
        title: "Minimal Loft Interior",
        year: "2023",
        location: "Chicago, IL",
        type: "Interior",
        role: "Architect Engineer (Interior + Lighting + Materials)",
        tags: ["Interior", "Minimal", "Lighting", "Materials"],
        shortDesc:
            "A minimal loft interior focusing on material honesty, warm lighting, and clean joinery details for a premium feel.",
        problem:
            "The space felt visually noisy and lacked a cohesive material language. The client wanted simplicity without feeling cold.",
        solution:
            "Created a consistent palette (wood + stone + matte metal). Used layered warm lighting and hidden storage to keep surfaces clean. Designed joinery lines to align with structural and furniture modules.",
        tools: ["SketchUp", "Blender", "Photoshop", "Enscape/Lumion"],
        images: [
            "/projects/minimal-loft-interior/01-hero.jpg",
            "/projects/minimal-loft-interior/02-kitchen.jpg",
            "/projects/minimal-loft-interior/03-living.jpg",
        ],
        metrics: [
            { label: "Style", value: "Minimal + warm" },
            { label: "Focus", value: "Lighting + joinery" },
            { label: "Key Focus", value: "Material consistency" },
        ],
    },

    {
        slug: "transit-oriented-masterplan",
        title: "Transit-Oriented Masterplan",
        year: "2025",
        location: "Houston, TX",
        type: "Urban Design",
        role: "Architect Engineer (Urban Strategy + Blocks + Streets)",
        tags: ["Urban", "Masterplan", "Mobility", "Public Realm"],
        shortDesc:
            "A walkable masterplan concept around transit—balancing density, public realm quality, and phased development logic.",
        problem:
            "The site had disconnected streets and car-heavy movement. The goal was to create a walkable district with clear phases and strong public spaces.",
        solution:
            "Designed a street hierarchy with slow streets, green corridors, and transit spine. Block typologies allow phased growth. Public spaces anchor daily life and improve comfort through shade and scale.",
        tools: ["AutoCAD", "Illustrator", "Rhino/SketchUp", "Blender"],
        images: [
            "/projects/transit-oriented-masterplan/01-hero.jpg",
            "/projects/transit-oriented-masterplan/02-street.jpg",
            "/projects/transit-oriented-masterplan/03-aerial.jpg",
        ],
        metrics: [
            { label: "Focus", value: "Walkability + transit" },
            { label: "Phasing", value: "3-phase growth plan" },
            { label: "Key Focus", value: "Public realm quality" },
        ],
    },
];

export const featuredProjects = projects.slice(0, 3);
