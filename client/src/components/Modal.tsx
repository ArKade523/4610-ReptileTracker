function Modal({
    children,
    open,
    onClose
}: {
    children: React.ReactNode
    open: boolean
    onClose: () => void
}) {
    if (!open) {
        return null
    }

    return (
        <div className="max-one-third sticky">
            {children}
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default Modal
