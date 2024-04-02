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
        <div className="modal">
            <div className="modal-content">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default Modal
