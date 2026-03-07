#!/usr/bin/env python3
"""Generate project placeholder images and displacement map for the portfolio."""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
import math
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH, HEIGHT = 700, 900

# Project color schemes (primary, secondary, accent)
PROJECTS = {
    'uk-gov': {
        'colors': [(30, 58, 138), (59, 130, 246), (147, 197, 253)],
        'name': 'UK GOV',
    },
    'capitec': {
        'colors': [(6, 78, 59), (16, 185, 129), (167, 243, 208)],
        'name': 'CAPITEC',
    },
    'absa': {
        'colors': [(127, 29, 29), (220, 38, 38), (254, 202, 202)],
        'name': 'ABSA',
    },
    'heineken': {
        'colors': [(120, 53, 15), (217, 119, 6), (253, 230, 138)],
        'name': 'HEINEKEN',
    },
    'fourpaws': {
        'colors': [(76, 29, 149), (139, 92, 246), (221, 214, 254)],
        'name': 'FOUR PAWS',
    },
}


def create_gradient(width, height, color1, color2, direction='vertical'):
    """Create a smooth gradient image."""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for i in range(height if direction == 'vertical' else width):
        ratio = i / (height if direction == 'vertical' else width)
        r = int(color1[0] + (color2[0] - color1[0]) * ratio)
        g = int(color1[1] + (color2[1] - color1[1]) * ratio)
        b = int(color1[2] + (color2[2] - color1[2]) * ratio)
        
        if direction == 'vertical':
            draw.line([(0, i), (width, i)], fill=(r, g, b))
        else:
            draw.line([(i, 0), (i, height)], fill=(r, g, b))
    
    return img


def add_geometric_shapes(img, colors):
    """Add abstract geometric shapes to an image."""
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # Large circle
    cx, cy = w * 0.6, h * 0.4
    radius = min(w, h) * 0.3
    draw.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        fill=colors[1] + (80,) if len(colors[1]) == 3 else colors[1],
        outline=None
    )
    
    # Smaller circles
    for _ in range(5):
        x = random.randint(int(w * 0.1), int(w * 0.9))
        y = random.randint(int(h * 0.1), int(h * 0.9))
        r = random.randint(20, 80)
        opacity = random.randint(30, 100)
        overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.ellipse(
            [x - r, y - r, x + r, y + r],
            fill=colors[2] + (opacity,)
        )
        img = Image.alpha_composite(img.convert('RGBA'), overlay)
    
    # Grid lines
    img_rgba = img.convert('RGBA')
    overlay = Image.new('RGBA', img_rgba.size, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for i in range(0, w, 50):
        overlay_draw.line([(i, 0), (i, h)], fill=(255, 255, 255, 10), width=1)
    for i in range(0, h, 50):
        overlay_draw.line([(0, i), (w, i)], fill=(255, 255, 255, 10), width=1)
    
    return Image.alpha_composite(img_rgba, overlay).convert('RGB')


def add_text(img, text, position='center'):
    """Add large text to image."""
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # Try to use a bold font
    font_size = 72
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/usr/share/fonts/TTF/DejaVuSans-Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()
    
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    x = (w - text_w) // 2
    y = (h - text_h) // 2
    
    # Add text shadow
    draw.text((x + 2, y + 2), text, fill=(0, 0, 0, 128), font=font)
    draw.text((x, y), text, fill=(255, 255, 255), font=font)
    
    return img


def create_project_image_1(name, colors, width=WIDTH, height=HEIGHT):
    """Create the first project image (abstract/model style)."""
    # Create gradient base
    img = create_gradient(width, height, colors[0], (0, 0, 0))
    
    # Add geometric decorations
    img = add_geometric_shapes(img, colors)
    
    # Add subtle blur for depth
    img = img.filter(ImageFilter.GaussianBlur(radius=2))
    
    # Re-add sharper elements on top
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # Large accent shape
    draw.rounded_rectangle(
        [w * 0.15, h * 0.2, w * 0.85, h * 0.8],
        radius=40,
        outline=colors[1],
        width=2
    )
    
    return img


def create_project_image_2(name, colors, text, width=WIDTH, height=HEIGHT):
    """Create the second project image (logo/brand style)."""
    # Darker gradient base
    dark1 = tuple(max(0, c - 30) for c in colors[0])
    dark2 = (10, 10, 20)
    img = create_gradient(width, height, dark2, dark1, 'vertical')
    
    # Add brand text
    img = add_text(img, text)
    
    # Add subtle decoration
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # Corner accents
    accent = colors[1]
    draw.line([(30, 30), (130, 30)], fill=accent, width=3)
    draw.line([(30, 30), (30, 130)], fill=accent, width=3)
    draw.line([(w - 30, h - 30), (w - 130, h - 30)], fill=accent, width=3)
    draw.line([(w - 30, h - 30), (w - 30, h - 130)], fill=accent, width=3)
    
    return img


def create_displacement_map(width=512, height=512):
    """Create a water/cloud displacement map."""
    img = Image.new('L', (width, height))
    pixels = img.load()
    
    # Generate Perlin-like noise using multiple octaves of sine waves
    for y in range(height):
        for x in range(width):
            value = 0
            # Multiple frequencies for organic look
            value += math.sin(x * 0.02) * math.cos(y * 0.02) * 60
            value += math.sin(x * 0.05 + 1.3) * math.cos(y * 0.04 + 0.7) * 40
            value += math.sin(x * 0.08 + 2.1) * math.cos(y * 0.09 + 1.2) * 25
            value += math.sin(x * 0.15 + 0.5) * math.cos(y * 0.12 + 2.3) * 15
            value += math.sin((x + y) * 0.03) * 30
            
            # Normalize to 0-255
            value = int(max(0, min(255, value + 128)))
            pixels[x, y] = value
    
    # Apply blur for smoother displacement
    img = img.filter(ImageFilter.GaussianBlur(radius=5))
    
    return img


def main():
    random.seed(42)  # Reproducible results
    
    print("Generating project images...")
    
    for key, project in PROJECTS.items():
        colors = project['colors']
        name = project['name']
        
        # Image 1 (abstract/model)
        img1 = create_project_image_1(name, colors)
        img1.save(os.path.join(OUTPUT_DIR, f'{key}-1.webp'), 'WEBP', quality=85)
        print(f"  Created {key}-1.webp")
        
        # Image 2 (logo/brand)
        img2 = create_project_image_2(name, colors, name)
        img2.save(os.path.join(OUTPUT_DIR, f'{key}-2.webp'), 'WEBP', quality=85)
        print(f"  Created {key}-2.webp")
    
    # Displacement map
    print("Generating displacement map...")
    disp = create_displacement_map()
    disp.save(os.path.join(OUTPUT_DIR, 'displacement.webp'), 'WEBP', quality=90)
    print("  Created displacement.webp")
    
    print("\nAll images generated successfully!")


if __name__ == '__main__':
    main()
