package encore.security.test.controller;


import encore.security.test.dto.mqtt.MqttPublishDto;
import encore.security.test.dto.mqtt.MqttSubscribeDto;
import encore.security.test.exception.ExceptionMessages;
import encore.security.test.exception.MqttException;
import encore.security.test.util.MqttUtil;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(value = "/api/mqtt")
public class MqttController {

    // Mqtt 채널 구독 시 필요함
    @PostMapping("/publish")
    public void publishMessage(@RequestBody @Valid MqttPublishDto messagePublishModel,
                               BindingResult bindingResult) throws org.eclipse.paho.client.mqttv3.MqttException {
        if (bindingResult.hasErrors()) {
            throw new MqttException(ExceptionMessages.SOME_PARAMETERS_INVALID);
        }

        MqttMessage mqttMessage = new MqttMessage(messagePublishModel.getMessage().getBytes());
        mqttMessage.setQos(messagePublishModel.getQos());
        mqttMessage.setRetained(messagePublishModel.getRetained());

        MqttUtil.getInstance().publish(messagePublishModel.getTopic(), mqttMessage);
    }

    @GetMapping("subscribe")
    public List<MqttSubscribeDto> subscribeChannel(@RequestParam(value = "topic") String topic,
                                                   @RequestParam(value = "wait_millis") Integer waitMillis)
            throws InterruptedException, org.eclipse.paho.client.mqttv3.MqttException {
        List<MqttSubscribeDto> messages = new ArrayList<>();
        CountDownLatch countDownLatch = new CountDownLatch(10);
        MqttUtil.getInstance().subscribeWithResponse(topic, (s, mqttMessage) -> {
            MqttSubscribeDto mqttSubscribeModel = new MqttSubscribeDto();
            mqttSubscribeModel.setId(mqttMessage.getId());
            mqttSubscribeModel.setMessage(new String(mqttMessage.getPayload()));
            mqttSubscribeModel.setQos(mqttMessage.getQos());
            messages.add(mqttSubscribeModel);
            countDownLatch.countDown();
        });

        countDownLatch.await(waitMillis, TimeUnit.MILLISECONDS);

        return messages;
    }


}
