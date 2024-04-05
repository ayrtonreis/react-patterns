import { DayEntry } from '../../../../../store/slices/calendar/types'

export function buildMockedTaskEntries(refTimestamp: Date): DayEntry[] {
    const refTime = new Date(
        refTimestamp.getFullYear(),
        refTimestamp.getMonth(),
        refTimestamp.getDate()
    ).getTime()

    return [
        [
            { title: 'Write a short story about a talking rabbit 📚', category: 2 },
            { title: 'Sketch a surreal landscape 🎨', category: 2 },
            { title: 'Compose an upbeat piano melody 🎹', category: 1 },
            {
                title: 'Design a minimalist logo for a sustainable fashion brand 🎨',
                category: 2,
            },
            { title: "Read a classic novel you've never tried before 📚", category: 0 },
            { title: 'Learn the basics of calligraphy 🖋️', category: 1 },
            { title: "Brainstorm ideas for a children's picture book 📚", category: 2 },
            { title: 'Experiment with watercolor painting techniques 🎨', category: 1 },
            { title: 'Write a poem about the changing seasons 📚', category: 0 },
            { title: 'Learn a new instrument, like the ukulele 🎶', category: 1 },
            { title: 'Design a minimalist poster with a powerful message 🎨', category: 2 },
            { title: 'Write a short play exploring themes of identity 📚', category: 2 },
            { title: 'Learn the basics of stop-motion animation 🎥', category: 1 },
            { title: 'Sculpt a small figurine out of clay 🎨', category: 1 },
            { title: 'Compose piece of music using only found sounds 🎶', category: 2 },
            { title: 'Create a series of abstract paintings 🎨', category: 2 },
        ],
        [],
        [
            {
                title: 'Write a short personal essay about a transformative experience 📚',
                category: 0,
            },
            { title: 'Design a set of handmade greeting cards 🎨', category: 1 },
            { title: 'Develop a concept for a unique board game 📚', category: 2 },
            { title: 'Learn the art of origami 🎨', category: 0 },
            { title: 'Write a short script for a quirky comedy sketch 📚', category: 2 },
            { title: 'Experiment with nature-inspired textile design 🎨', category: 1 },
            { title: 'Compose a song using only your voice 🎶', category: 2 },
            { title: 'Create a series of digital illustrations 🎨', category: 1 },
            { title: 'Write a short story about a time traveler 📚', category: 2 },
            { title: 'Learn the basics of hand lettering 🖋️', category: 0 },
            { title: 'Develop a concept for a unique light installation 🎨', category: 2 },
            { title: 'Compose a short piece of music inspired by nature 🎶', category: 1 },
            { title: 'Write a personal blog post about your creative process 📚', category: 0 },
            {
                title: 'Create a series of abstract sculptures using found materials 🎨',
                category: 2,
            },
            {
                title: 'Compose a short piece of music using only electronic sounds 🎶',
                category: 2,
            },
            {
                title: 'Write a short play exploring themes of love and relationships 📚',
                category: 1,
            },
            { title: 'Design a series of minimalist patterns 🎨', category: 1 },
            {
                title: 'Compose a short piece of music using only acoustic instruments 🎶',
                category: 2,
            },
            { title: 'Write a short story about a magical realism 📚', category: 2 },
            { title: 'Create a series of nature-inspired textile designs 🎨', category: 1 },
            { title: 'Compose a short piece of music using only found sounds 🎶', category: 2 },
            {
                title: 'Write a personal essay about your creative inspirations 📚',
                category: 0,
            },
            { title: 'Design a series of minimalist book covers 🎨', category: 2 },
            { title: 'Compose a short piece of music using only your voice 🎶', category: 1 },
            { title: 'Write a short story about a futuristic utopia 📚', category: 2 },
        ],
        [],
        [{ title: 'Develop a concept for an independent film 📚', category: 0 }],
        [],
        [
            {
                title: 'Read a collection of short stories by a Nobel Prize-winning author 📚',
                category: 0,
            },
            { title: 'Learn the basics of improv comedy 🎭', category: 0 },
            { title: 'Develop a concept for a unique immersive art installation 🎨', category: 2 },
            { title: 'Write a screenplay for a science-fiction film 📚', category: 2 },
            {
                title: 'Design a series of minimalist posters exploring social justice themes 🎨',
                category: 2,
            },
        ],
        [],
        [],
        [],
        [{ title: 'Create a collage using found materials 🎨', category: 1 }],
    ].map((tasks, i) => ({
        day: new Date(refTime + 86_400_000 * i).toISOString(),
        tasks: tasks.map((task) => ({ id: `task-${i}`, ...task })),
    })) as DayEntry[]
}
