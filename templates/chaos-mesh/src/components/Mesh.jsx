import { useColorMode } from '@docusaurus/theme-common'
import { gsap } from 'gsap'
import React, { useLayoutEffect, useRef } from 'react'
import { useDidMountEffect } from '../utils/hooks'

// Configurações e cores
const rows = 12
const dotsPerRow = 12
const dotsNum = rows * dotsPerRow
const spacing = 25

// Cores baseadas na logo
const dotColor1 = '#0095FF' // Azul principal
const dotColor2 = '#2B7FFF' // Azul secundário
const dotColor3 = '#00E1FF' // Ciano para destaque

// Funções auxiliares para cores
function setNeutralDotColor(theme) {
  return theme !== 'dark' ? 'rgba(43, 127, 255, 0.2)' : 'rgba(0, 225, 255, 0.3)'
}

function setDotColor(theme) {
  const rand = Math.random()
  if (rand > 0.7) return dotColor1
  if (rand > 0.4) return dotColor2
  if (rand > 0.2) return dotColor3
  return setNeutralDotColor(theme)
}

function setLineColor(theme) {
  return theme !== 'dark' ? 'rgba(43, 127, 255, 0.1)' : 'rgba(0, 225, 255, 0.15)'
}

export default function Mesh() {
  const svgEl = useRef()
  const pathsGroup = useRef()
  const dotsGroup = useRef()
  const ptsRef = useRef([])

  const { colorMode } = useColorMode()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let scaling = false
      let percent = 0
      let curve1 = 5
      let curve2 = 0
      let curve2Range = [3, 4, 5]
      let injectedDot = 64
      let injectedDots = [64]

      // Função de redesenho das linhas
      function reDraw() {
        let row = 0
        const pts = ptsRef.current

        for (let i = 0; i < pts.length; i++) {
          pts[i] = { 
            x: gsap.getProperty('.dot-' + i, 'x'), 
            y: gsap.getProperty('.dot-' + i, 'y') 
          }

          if (i % dotsPerRow === 0) {
            row++
          }

          if (row < rows) {
            if ((i % dotsPerRow === 0 && row % 2 === 0) || 
                (i % dotsPerRow === dotsPerRow - 1 && row % 2 === 1)) {
              gsap.set('.path-' + i, {
                attr: {
                  d: 'M' + pts[i].x + ',' + pts[i].y + 
                     'L' + pts[i + dotsPerRow].x + ',' + pts[i + dotsPerRow].y,
                },
              })
            } else {
              if (row % 2 === 1) {
                const start = `M ${pts[i + dotsPerRow].x} ${pts[i + dotsPerRow].y}`
                let dot = ` L ${pts[i].x} ${pts[i].y}`
                let end = ` L ${pts[i + dotsPerRow + 1].x} ${pts[i + dotsPerRow + 1].y}`
                const d = start + dot + end

                if (i === injectedDot && scaling) {
                  dot = ` C ${pts[i + dotsPerRow].x} ${pts[i + dotsPerRow].y - curve1 * percent}, ${pts[i].x} ${
                    pts[i].y + curve2 * percent
                  }, ${pts[i].x} ${pts[i].y}`
                  end = ` C ${pts[i].x + curve2 * percent} ${pts[i].y}, ${
                    pts[i + dotsPerRow + 1].x - curve1 * percent
                  } ${pts[i + dotsPerRow + 1].y}, ${pts[i + dotsPerRow + 1].x} ${pts[i + dotsPerRow + 1].y}`

                  gsap.set('.path-' + i, {
                    attr: {
                      d: start + dot + end,
                      'stroke-dasharray': `30 ${10 * percent}`,
                    },
                  })
                } else {
                  gsap.set('.path-' + i, {
                    attr: {
                      d,
                    },
                  })
                }
              } else {
                const start = `M ${pts[i + dotsPerRow - 1].x} ${pts[i + dotsPerRow - 1].y}`
                let dot = ` L ${pts[i].x} ${pts[i].y}`
                let end = ` L ${pts[i + dotsPerRow].x} ${pts[i + dotsPerRow].y}`
                const d = start + dot + end

                if (i === injectedDot - dotsPerRow && scaling) {
                  end = ` C ${pts[i].x + curve1 * percent} ${pts[i].y}, ${pts[i + dotsPerRow].x - curve2 * percent} ${
                    pts[i + dotsPerRow].y
                  }, ${pts[i + dotsPerRow].x} ${pts[i + dotsPerRow].y}`

                  gsap.set('.path-' + i, {
                    attr: {
                      d: start + dot + end,
                      'stroke-dasharray': `30 ${10 * percent}`,
                    },
                  })
                } else if (i === injectedDot - dotsPerRow + 1 && scaling) {
                  dot = ` C ${pts[i + dotsPerRow - 1].x} ${pts[i + dotsPerRow - 1].y - curve2 * percent}, ${pts[i].x} ${
                    pts[i].y + curve1 * percent
                  }, ${pts[i].x} ${pts[i].y}`

                  gsap.set('.path-' + i, {
                    attr: {
                      d: start + dot + end,
                      'stroke-dasharray': `30 ${10 * percent}`,
                    },
                  })
                } else if ((i === injectedDot + dotsPerRow || i === injectedDot + dotsPerRow + 1) && scaling) {
                  gsap.set('.path-' + i, {
                    attr: {
                      d,
                      'stroke-dasharray': `30 ${10 * percent}`,
                    },
                  })
                } else {
                  gsap.set('.path-' + i, {
                    attr: {
                      d,
                    },
                  })
                }
              }
            }
          }
        }
      }

      // Criação inicial dos pontos e linhas
      let i = 0
      for (let row = 0; row < rows; row++) {
        for (let dotNum = 0; dotNum < dotsPerRow; dotNum++) {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          gsap.set(path, {
            attr: { 
              class: 'path path-' + i, 
              fill: 'none', 
              stroke: setLineColor(colorMode), 
              'stroke-width': 0.4 
            },
          })
          pathsGroup.current.appendChild(path)

          const dotG = document.createElementNS('http://www.w3.org/2000/svg', 'g')
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
          const position = { 
            x: (row % 2 ? 0 : spacing) + dotNum * spacing * 2, 
            y: row * spacing 
          }
          
          ptsRef.current.push(position)

          gsap.set(dotG, {
            attr: { class: 'dot dot-' + i },
            ...position,
          })

          const color = setDotColor(colorMode)
          gsap.set(dot, {
            attr: { 
              class: 'dot-inner', 
              r: 1.2,
              fill: color, 
              stroke: color, 
              'stroke-opacity': 0.6, 
              'stroke-width': 1.2 
            },
          })

          dotG.appendChild(dot)
          dotsGroup.current.appendChild(dotG)

          i++
        }
      }

      // Animação da malha
      gsap.to('.dot', {
        duration: 4,
        x: '+=8',
        y: '-=16',
        ease: 'sine.inOut',
        stagger: { 
          grid: [rows, dotsPerRow], 
          amount: 1.5, 
          from: 'random', 
          repeat: -1, 
          yoyo: true 
        },
        onUpdate: reDraw,
      })

      // Animação de rotação no movimento do mouse
      svgEl.current.addEventListener('mousemove', (e) => {
        const rotationX = Math.max((1 - e.clientY / window.innerHeight) * 45, 30)
        const rotationY = Math.max((1 - e.clientX / window.innerWidth) * -18, -9)

        gsap.to('.mesh', {
          duration: 1.5,
          rotationX,
          rotationY,
        })
      })

      // Função de injeção de caos
      function injectChaos() {
        if (!window.matchMedia('(min-width: 768px)').matches) {
          return
        }

        if (!scaling) {
          curve2 = curve2Range[Math.floor(Math.random() * curve2Range.length)]
          injectedDot = injectedDots[Math.floor(Math.random() * injectedDots.length)]

          scaling = true

          const rect = document.querySelector(`.dot-${injectedDot}`).getBoundingClientRect()
          const top = rect.top + 100
          const left = rect.left - 250

          const injected = gsap.to(`.dot-${injectedDot}`, {
            duration: 2.5,
            scale: 6,
            ease: 'back.inOut(2.5)',
            repeat: 5,
            yoyo: true,
            onUpdate: function () {
              percent = injected.time()
            },
            onComplete: () => (scaling = false),
          })

          const dotG = document.querySelector(`.dot-${injectedDot}`)
          for (let i = 0; i < 15; i++) {
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

            gsap.set(dot, {
              attr: {
                class: `wave wave-${i}`,
                r: 0,
                fill: 'none',
                stroke: dotColor3,
                'stroke-opacity': 0.4,
                'stroke-width': 0.4,
              },
            })

            dotG.appendChild(dot)
          }

          const tl = gsap.timeline({
            onComplete: function () {
              document.querySelectorAll('.wave').forEach((el) => el.remove())
            },
          })

          for (let i = 0; i < 15; i++) {
            tl.to(`.wave-${i}`, {
              duration: 1.5,
              attr: {
                r: 15,
                'stroke-opacity': 0,
                'stroke-width': 0,
              },
              ease: 'sine.inOut',
            })
          }
        }
      }

      svgEl.current.addEventListener('click', injectChaos)
      setTimeout(() => {
        injectChaos()
      }, 1500)
    }, svgEl)

    return () => {
      ctx.kill()
      ptsRef.current = []
    }
  }, [])

  // Atualização de cores quando o tema muda
  useDidMountEffect(() => {
    for (let i = 0; i < dotsNum; i++) {
      const fill = gsap.getProperty(`.dot-${i} > .dot-inner`, 'fill')

      if (fill !== dotColor1 && fill !== dotColor2 && fill !== dotColor3) {
        const dotColor = setNeutralDotColor(colorMode)

        gsap.set(`.dot-${i} > .dot-inner`, {
          attr: {
            fill: dotColor,
            stroke: dotColor,
          },
        })
      }
    }
    
    gsap.set('.path', {
      attr: {
        stroke: setLineColor(colorMode),
      },
    })
  }, [colorMode])

  return (
    <>
      <svg
        ref={svgEl}
        className="mesh tw-absolute tw-top-[-10%] 2xl:tw-left-[-100px] tw-w-[1024px] lg:tw-w-full tw-h-[125%]"
        style={{
          transform: 'rotate3d(2, -.4, -1, 25deg)',
        }}
        viewBox="0 0 500 250"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={pathsGroup} />
        <g ref={dotsGroup} />
      </svg>
      <div className={`mesh-text tw-absolute tw-px-2 tw-py-1 tw-bg-primary tw-text-white tw-rounded tw-opacity-0`} />
    </>
  )
}