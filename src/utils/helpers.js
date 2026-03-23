   /**
     * Format number as Nigerian Naira currency
     */
    export const formatCurrency = (num) => "₦" + num.toLocaleString("en-NG");
    
    /**
     * Get badge status object from equipment availability status
     */
    export const getBadgeStatus = (status) => {
      const statuses = {
        available: { label: "IN STOCK", className: "badge-green" },
        rented: { label: "RENTED", className: "badge-red" },
        limited: { label: "LIMITED", className: "badge-amber" },
      };
      return statuses[status] || statuses.available;
    };