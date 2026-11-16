export function getStatusLabel(status: string) {
        switch (status) {
            case 'INITIATED':
                return 'À compléter';
            case 'READY_FOR_CONFIRMATION':
                return 'À confirmer';
            case 'CONFIRMED':
                return 'Confirmée';
            case 'IN_PROGRESS':
                return 'En cours';
            case 'PAID':
                return 'Payée';
            case 'COMPLETED':
                return 'Clôturée';
            case 'CANCELED':
                return 'Annulée';
            default:
                return 'Inconnue';
        }
  }

export function  getStatusSeverity(status: string) {
    switch (status) {
        case 'INITIATED':
            return 'secondary' as const;
        case 'READY_FOR_CONFIRMATION':
            return 'warn' as const;
        case 'CONFIRMED':
            return 'info' as const;
        case 'IN_PROGRESS':
            return 'info' as const;
        case 'PAID':
        case 'COMPLETED':
            return 'success' as const;
        case 'CANCELED':
            return 'danger' as const;
        default:
            return 'secondary' as const;
    }
}