import * as core from '@actions/core'
import {Agent} from '@veramo/core'
import {AgentRestClient} from '@veramo/remote-client'

async function run(): Promise<void> {
  try {
    const agent = new Agent({
      plugins: [
        new AgentRestClient({
          url: core.getInput('url'),
          enabledMethods: [core.getInput('method')],
          headers: {
            Authorization: `Bearer ${core.getInput('token')}`
          }
        })
      ]
    })

    const result = await agent.execute(
      core.getInput('method'),
      JSON.parse(core.getInput('args'))
    )

    core.setOutput('result', result)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
