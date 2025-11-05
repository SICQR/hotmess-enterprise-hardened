/**
 * The radio schedule defines the structure of each HOTMESS show. It
 * specifies the name, a description, and the list of segments that
 * comprise the broadcast. Each segment includes a label and a brief
 * description so the Radio page can display the rundown. This file
 * provides an extensible way to manage radio content separate from
 * presentation logic.
 */

export interface Segment {
  /**
   * A short heading describing the type of segment, such as Stinger,
   * Sponsor Read, Consent Cue, Wetter Watch or Closing.
   */
  label: string;
  /** A one‑sentence summary of the segment content. */
  description: string;
}

export interface Show {
  name: string;
  /** A blurb describing the mood and purpose of the show. */
  overview: string;
  /** The list of segments that make up the show. */
  segments: Segment[];
}

export const radioSchedule: Show[] = [
  {
    name: 'Wake the Mess',
    overview:
      'Start your day with bold beats, cheeky idents and Wetter Watch updates. This show energises you for the day ahead with sponsor reads and consent cues to keep things responsible.',
    segments: [
      { label: 'Opener', description: 'High‑energy introduction with show ident and welcome.' },
      { label: 'Stinger 1', description: 'Quick ident reminding listeners they’re tuned to HOTMESS Radio.' },
      { label: 'Sponsor Read', description: 'Promotion for HNH MESS lube with a call‑to‑action.' },
      { label: 'Consent Cue', description: 'Reminder that this is a men‑only, 18+ broadcast and listener consent is required.' },
      { label: 'Wetter Watch', description: 'Playful weather update delivered with a cheeky twist.' },
      { label: 'Closing', description: 'Affirmations to carry listeners through the day.' },
    ],
  },
  {
    name: 'Dial‑A‑Daddy',
    overview:
      'Call‑ins, messy stories and community engagement. Join three times a week for candid conversations, stingers, sponsor reads and a closing affirmation.',
    segments: [
      { label: 'Intro', description: 'Greeting and theme for the episode.' },
      { label: 'Call‑in Segment', description: 'Listeners call in to share stories and questions.' },
      { label: 'Stinger 2', description: 'Second show ident to keep the energy up.' },
      { label: 'Sponsor Read', description: 'Highlight of a featured product or upcoming drop.' },
      { label: 'Closing', description: 'Wrap‑up and affirmation reminding listeners to care for themselves.' },
    ],
  },
  {
    name: 'Hand N Hand',
    overview:
      'The only place to land on Sundays. Focused on aftercare, mental health and hydration, with guest interviews and soothing content.',
    segments: [
      { label: 'Mindful Breathing', description: 'Guided breathing exercise to decompress.' },
      { label: 'Guest Chat', description: 'Interview with a guest expert or community member.' },
      { label: 'Aftercare Tips', description: 'Practical advice on hydration, rest and communication.' },
      { label: 'Consent Cue', description: 'Reminder of consent and men‑only space.' },
      { label: 'Closing', description: 'Gentle affirmation and encouragement for the week ahead.' },
    ],
  },
];