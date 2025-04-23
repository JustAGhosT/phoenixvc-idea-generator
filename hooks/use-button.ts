"use client"

import { useCallback, useState } from "react"

/**
 * Options for the useButton hook
 */
export interface UseButtonOptions {
  /**
   * Callback function to execute when the button is clicked
   */
  onClick?: () => void | Promise<void>
  
  /**
   * Whether the button should be disabled initially
   * @default false
   */
  initialDisabled?: boolean
  
  /**
   * Whether to show loading state during async operations
   * @default true
   */
  showLoading?: boolean
  
  /**
   * Error handler function
   */
  onError?: (error: unknown) => void
}

/**
 * A reusable hook for managing button state and interactions
 * 
 * @example
 * ```tsx
 * const { handleClick, loading, disabled } = useButton({
 *   onClick: async () => {
 *     await api.performAction()
 *   },
 *   onError: (err) => toast.error(err.message)
 * })
 * 
 * return (
 *   <Button 
 *     onClick={handleClick} 
 *     disabled={disabled}
 *   >
 *     {loading ? 'Processing...' : 'Submit'}
 *   </Button>
 * )
 * ```
 */
export function useButton({
  onClick,
  initialDisabled = false,
  showLoading = true,
  onError
}: UseButtonOptions = {}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(initialDisabled)

  const handleClick = useCallback(async () => {
    if (loading || disabled || !onClick) return
    
    if (showLoading) {
      setLoading(true)
    }
    
    try {
      await onClick()
    } catch (error) {
      if (onError) {
        onError(error)
      } else {
        console.error("Button click error:", error)
      }
    } finally {
      if (showLoading) {
        setLoading(false)
      }
    }
  }, [loading, disabled, onClick, showLoading, onError])

  const setIsDisabled = useCallback((isDisabled: boolean) => {
    setDisabled(isDisabled)
  }, [])

  return {
    handleClick,
    loading,
    disabled,
    setDisabled: setIsDisabled
  }
}