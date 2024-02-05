import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) => {
    if (current_theme) {
        c_c("--nav_bg_color", "#0d1c2b")
        c_c("--nav_fixed_shadow", "transparent")
        c_c("--nav_item_color", "#ffff")
        c_c("--nav_item_active_color", "#e78287")
        c_c("--nav_item_hover_color", "#f67d61")

    } else {
        c_c("--nav_bg_color", "#f8f8ff")
        c_c("--nav_fixed_shadow", "transparent")
        c_c("--nav_item_color", "#4e4e4e")
        c_c("--nav_item_active_color", "#f67d61")
        c_c("--nav_item_hover_color", "#f76700")
    }
}

export default change_theme