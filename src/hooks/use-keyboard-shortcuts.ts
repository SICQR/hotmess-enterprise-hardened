import { useEffect } from 'react'

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  alt?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return

    function handleKeyPress(e: KeyboardEvent) {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey : true
        const metaMatch = shortcut.meta ? e.metaKey : true
        const shiftMatch = shortcut.shift ? e.shiftKey : true
        const altMatch = shortcut.alt ? e.altKey : true
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase()

        const needsModifier = shortcut.ctrl || shortcut.meta || shortcut.shift || shortcut.alt
        const hasModifier = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey

        if (needsModifier && hasModifier && ctrlMatch && metaMatch && shiftMatch && altMatch && keyMatch) {
          e.preventDefault()
          shortcut.action()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [shortcuts, enabled])
}

export function useGlobalShortcuts(navigate: (route: string) => void) {
  useKeyboardShortcuts([
    {
      key: 'r',
      meta: true,
      action: () => navigate('radio'),
      description: 'Go to Radio'
    },
    {
      key: 's',
      meta: true,
      action: () => navigate('shop'),
      description: 'Go to Shop'
    },
    {
      key: 'c',
      meta: true,
      action: () => navigate('care'),
      description: 'Go to Care'
    },
    {
      key: 'e',
      meta: true,
      action: () => navigate('earn'),
      description: 'Go to Earn'
    },
    {
      key: 'h',
      meta: true,
      action: () => navigate('home'),
      description: 'Go to Home'
    }
  ])
}
