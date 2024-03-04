import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) => {
    if (current_theme) {
        c_c("--nav_bg_color", "#0d1c2b")
        c_c("--nav_fixed_shadow", "transparent")
        c_c("--nav_item_color", "#ffff")
        c_c("--nav_item_active_color", "#e96969")
        c_c("--nav_item_hover_color", "#e96969")

    } else {
        c_c("--nav_bg_color", "#fdfbfb")
        c_c("--nav_fixed_shadow", "transparent")
        c_c("--nav_item_color", "#4d4949")
        c_c("--nav_item_active_color", "#e96969")
        c_c("--nav_item_hover_color", "#e96969")
    }
}

export default change_theme