from PIL import ImageDraw
from .base import BaseEyeDrawer

class CircleEyeDrawer(BaseEyeDrawer):
    def draw_eye(self, position):
        draw = ImageDraw.Draw(self.img)
        draw.ellipse(
            position,
            fill    = None,
            width   = self.factory.box_size,
            outline = "black",
        )
    
    def draw_eyeball(self, position):
        draw = ImageDraw.Draw(self.img)
        draw.ellipse(
            position,
            fill    = True,
            outline = "black",
            width   = self.factory.box_size,
        )

    def draw_nw_eye(self, position):
        self.draw_eye(position)

    def draw_nw_eyeball(self, position):
        self.draw_eyeball(position)

    def draw_ne_eye(self, position):
        self.draw_eye(position)

    def draw_ne_eyeball(self, position):
        self.draw_eyeball(position)

    def draw_sw_eye(self, position):
        self.draw_eye(position)

    def draw_sw_eyeball(self, position):
        self.draw_eyeball(position)

class BarsEyeDrawer(BaseEyeDrawer):
    def draw_eye(self, position, corners):
        draw = ImageDraw.Draw(self.img)
        draw.rounded_rectangle(
            position,
            fill    = None,
            width   = self.factory.box_size,
            outline = "black",
            radius  = self.factory.box_size * 2,
            corners = corners,
        )

    def draw_eyeball(self, position, corners):
        draw = ImageDraw.Draw(self.img)
        draw.rounded_rectangle(
            position,
            fill    = True,
            outline = "black",
            radius  = self.factory.box_size,
            corners = corners,
        )

    def draw_nw_eye(self, position):
        self.draw_eye(position, corners = [True, True, False, True])

    def draw_nw_eyeball(self, position):
        self.draw_eyeball(position, corners = [True, True, False, True])

    def draw_ne_eye(self, position):
        self.draw_eye(position, corners = [True, True, True, False])

    def draw_ne_eyeball(self, position):
        self.draw_eyeball(position, corners = [True, True, True, False])

    def draw_sw_eye(self, position):
        self.draw_eye(position, corners = [True, False, True, True])

    def draw_sw_eyeball(self, position):
        self.draw_eyeball(position, corners = [True, False, True, True])