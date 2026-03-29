interface SideMenuStyles {
  logoContainer: React.CSSProperties;
  logoImage: React.CSSProperties;
}

export const styles: SideMenuStyles = {
  logoContainer: {
    height: 64,
    margin: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    transition: "all 0.2s ease",
  },
  logoImage: {
    maxHeight: "100%",
    objectFit: "contain" as const,
    transition: "max-width 0.2s ease",
  },
};
