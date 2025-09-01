controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Superman.setImage(assets.image`Suberman1`)
    Superman.setVelocity(0, -30)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game_started == 1) {
        if (super_mango) {
            Superman.setImage(assets.image`Suberman`)
            projectile = sprites.createProjectileFromSprite(assets.image`myImage3`, Superman, 100, 0)
        } else {
            if (projectile_cooldown) {
                Superman.setImage(assets.image`Suberman`)
                projectile = sprites.createProjectileFromSprite(assets.image`myImage3`, Superman, 100, 0)
                projectile_cooldown = false
                pause(500)
                projectile_cooldown = true
            } else {
                Superman.sayText("RELAX", 100, true)
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game_started == 1) {
        if (super_mango) {
            Superman.setImage(assets.image`Suberman0`)
            projectile = sprites.createProjectileFromSprite(assets.image`myImage3`, Superman, -100, 0)
        } else {
            if (projectile_cooldown) {
                Superman.setImage(assets.image`Suberman0`)
                projectile = sprites.createProjectileFromSprite(assets.image`myImage3`, Superman, -100, 0)
                projectile_cooldown = false
                pause(500)
                projectile_cooldown = true
            } else {
                Superman.sayText("RELAX", 100, true)
            }
        }
    } else {
        game_started = 1
        game.splash("GO!")
        sprites.destroy(mySprite)
        if (game_started == 1) {
            scene.setBackgroundImage(assets.image`myImage2`)
            Superman = sprites.create(assets.image`Suberman`, SpriteKind.Player)
            Superman.setPosition(19, 96)
            for (let index = 0; index < info.life(); index++) {
                Trees = sprites.create(assets.image`myImage5`, SpriteKind.Food)
                Trees.setPosition(randint(0, 160), randint(0, 120))
                trees_array[trees_array.length] = Trees
            }
            for (let index = 0; index < 2; index++) {
                enemey1 = sprites.create(assets.image`Darkside`, SpriteKind.Enemy)
                enemey1.setScale(0.7, ScaleAnchor.Middle)
                tiles.placeOnRandomTile(enemey1, assets.tile`transparency16`)
                enemey1.follow(trees_array[randint(0, trees_array.length - 1)])
            }
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    Superman.setVelocity(0, 0)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Superman.setImage(assets.image`Suberman0`)
    Superman.setVelocity(-30, 0)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    Superman.setVelocity(0, 0)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    Superman.setVelocity(0, 0)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Enemy, function (sprite, otherSprite) {
    pause(5000)
    if (sprite.overlapsWith(otherSprite)) {
        game.splash("Tree was destroyed", "new trees will start appearing on screen")
        info.changeLifeBy(-1)
        for (let value of trees_array) {
            sprites.destroy(value, effects.spray, 500)
        }
        trees_array = []
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let index = 0; index < info.life(); index++) {
            Trees = sprites.create(assets.image`myImage5`, SpriteKind.Food)
            Trees.setPosition(randint(0, 160), randint(0, 120))
            trees_array[trees_array.length] = Trees
        }
        for (let index = 0; index < 2; index++) {
            enemey1 = sprites.create(assets.image`Darkside`, SpriteKind.Enemy)
            enemey1.setScale(0.7, ScaleAnchor.Middle)
            tiles.placeOnRandomTile(enemey1, assets.tile`transparency16`)
            enemey1.follow(trees_array[randint(0, trees_array.length - 1)])
        }
    }
})
info.onCountdownEnd(function () {
    if (super_mango) {
        super_mango = false
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Superman.setImage(assets.image`Suberman`)
    Superman.setVelocity(30, 0)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    Superman.setVelocity(0, 0)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Superman.setImage(assets.image`Suberman2`)
    Superman.setVelocity(0, 30)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    Superman.setImage(assets.image`Suberman_punching`)
    info.changeScoreBy(1)
    Remaining_Trees = info.score()
    sprites.destroy(otherSprite)
    if (0 == Remaining_Trees % 2) {
        enemey1 = sprites.create(assets.image`Darkside`, SpriteKind.Enemy)
        enemey1.setScale(0.7, ScaleAnchor.Middle)
        enemey1.setPosition(randint(0, 150), randint(0, 150))
        enemey1.follow(trees_array[randint(0, trees_array.length - 1)])
        enemey1 = sprites.create(assets.image`Darkside`, SpriteKind.Enemy)
        enemey1.setScale(0.7, ScaleAnchor.Middle)
        enemey1.follow(trees_array[randint(0, trees_array.length - 1)])
        enemey1.setPosition(randint(0, 150), randint(0, 150))
    }
    if (info.score() % 50 == 0) {
        super_mango = true
        info.startCountdown(10)
        game.splash("SUPERMANGO ABILITY")
    }
    pause(500)
    Superman.setImage(assets.image`Suberman`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    Superman.setImage(assets.image`Suberman_punching`)
    info.changeScoreBy(1)
    Remaining_Trees = info.score()
    sprites.destroy(otherSprite)
    if (0 == Remaining_Trees % 2) {
        enemey1 = sprites.create(assets.image`Darkside`, SpriteKind.Enemy)
        enemey1.setScale(0.7, ScaleAnchor.Middle)
        enemey1.setPosition(randint(0, 150), randint(0, 150))
        enemey1.follow(trees_array[randint(0, trees_array.length - 1)])
        enemey1 = sprites.create(assets.image`Darkside`, SpriteKind.Enemy)
        enemey1.setScale(0.7, ScaleAnchor.Middle)
        enemey1.follow(trees_array[randint(0, trees_array.length - 1)])
        enemey1.setPosition(randint(0, 150), randint(0, 150))
    }
    pause(500)
    Superman.setImage(assets.image`Suberman`)
})
let enemey1: Sprite = null
let Trees: Sprite = null
let projectile: Sprite = null
let Superman: Sprite = null
let mySprite: Sprite = null
let trees_array: Sprite[] = []
let Remaining_Trees = 0
let game_started = 0
let projectile_cooldown = false
let super_mango = false
info.setLife(10)
super_mango = false
projectile_cooldown = true
game_started = 0
Remaining_Trees = 0
trees_array = []
if (game_started == 0) {
    mySprite = sprites.create(assets.image`Scene_0`, SpriteKind.Player)
    mySprite.sayText(":)")
    animation.runImageAnimation(
    mySprite,
    assets.animation`Animation`,
    500,
    false
    )
}
