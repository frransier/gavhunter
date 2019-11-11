import React, { useState, useEffect } from "react"
import { Box } from "rebass"
import { Label, Input, Slider } from "@rebass/forms"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [aktier, setAktier] = useState(100)
  const [gav, setGav] = useState(10)
  const [kurs, setKurs] = useState(0)
  const [invest, setInvest] = useState(0)
  const [avg, setAvg] = useState("")

  var formatter = new Intl.NumberFormat("sv-SV", {
    style: "currency",
    currency: "SEK",
  })

  useEffect(() => {
    const value = aktier * gav
    const investStock = invest / kurs
    var average = (value + invest) / (aktier + investStock)
    const sek = formatter.format(average)
    setAvg(sek)
  }, [kurs, gav, aktier, invest])

  return (
    <Layout>
      <SEO title="GAV is life" />
      <Box>
        <Label htmlFor="aktier">Antal aktier</Label>
        <Input
          onChange={e => setAktier(parseFloat(e.target.value))}
          id="aktier"
          name="aktier"
          type="number"
          value={aktier}
        />
        <Slider
          onChange={e => setAktier(parseFloat(e.target.value))}
          min={0}
          max={100000}
          defaultValue={aktier}
        ></Slider>
      </Box>
      <Box>
        <Label htmlFor="gav">Snittpris</Label>
        <Input
          onChange={e => setGav(parseFloat(e.target.value))}
          id="gav"
          name="gav"
          type="number"
          value={gav}
        />
        <Slider
          onChange={e => setGav(parseFloat(e.target.value))}
          min={0}
          max={500}
          defaultValue={gav}
        ></Slider>
      </Box>
      <Box>
        <Label htmlFor="gav">Dagens kurs</Label>
        <Input
          onChange={e => setKurs(parseFloat(e.target.value))}
          id="kurs"
          name="kurs"
          type="number"
          value={kurs}
        />
        <Slider
          onChange={e => setKurs(parseFloat(e.target.value))}
          min={0}
          max={500}
          defaultValue={kurs}
        ></Slider>
      </Box>
      <Box>
        <Label htmlFor="gav">Investera</Label>
        <Input
          onChange={e => setInvest(parseFloat(e.target.value))}
          id="kurs"
          name="kurs"
          type="number"
          value={invest}
        />
        <Slider
          onChange={e => setInvest(parseFloat(e.target.value))}
          min={0}
          max={500000}
          defaultValue={invest}
        ></Slider>
      </Box>

      <Box>Grundinvestering: {aktier * gav} kr</Box>
      <Box>Värde idag: {aktier * kurs || "-"} kr</Box>
      <Box color={kurs > gav ? "green" : "red"}>
        +/-: {kurs * aktier - gav * aktier || "-"} kr
      </Box>
      <Box>Nytt gav: {avg} kr per aktie</Box>
    </Layout>
  )
}

export default IndexPage
