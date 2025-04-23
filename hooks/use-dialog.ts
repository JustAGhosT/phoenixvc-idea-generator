"use client"

import { useCallback, useState } from "react"

/**
 * A reusable hook for managing dialog state
 * 
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useDialog()
 * 
 * return (
 *   <>
 *     <Button onClick={open}>Open Dialog</Button>
 *     <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *       <DialogContent>
 *         <Button onClick={close}>Close</Button>
 *       </DialogContent>
 *     </Dialog>
 *   </>
 * )
 * ```
 */
export function useDialog(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle
  }
}