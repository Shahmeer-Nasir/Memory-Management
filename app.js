
function SetValues() {

    document.getElementById('memory-opt').value = 4;
    document.getElementById('partitions-opt').value = 1;
    document.getElementById('processes-opt').value = 1;
}

function AddPartition(memory_size, part_num){
    // ---------------- WORKING HERE -------------

    size = Math.floor(Math.random() * memory_size / 2) + 2;

    const memory = document.getElementById('memory');

    const node = document.createElement('div')
    const node1 = document.createElement('input');
    node1.type = 'text';
    node1.value = size;
    node1.id = 'partition-' + part_num;

    node.appendChild(node1);
    node.className = 'partition';

    memory.appendChild(node);

    return memory_size - size;
}

function AddProcess(process_size, process_num) {

    size = Math.floor(Math.random() * memory_size / 2) + 2;

    const container = document.getElementById('process-stack');

    const node = document.createElement('div');
    const node1 = document.createElement('input');

    node1.type = 'text';
    node1.value = size;
    node1.id = 'process-' + process_num;
    node.appendChild(node1);
    node.className = 'process';
    container.appendChild(node);
}


function UpdateType(id) {

    SetValues();
    
    if(id == 'static') {
        document.getElementById('partitions-opt').disabled = false;
        // document.getElementById('part-size').disabled = false;
        document.getElementById('memory').innerHTML = '';
    }
    else if (id == 'dynamic') {
        document.getElementById('partitions-opt').disabled = true;
        // document.getElementById('part-size').disabled = true;
        document.getElementById('memory').innerHTML = '';
    }
}

function UpdateMemory(id) {

    memory_size = document.getElementById(id).value;
    document.getElementById('memory-size').innerHTML = memory_size;
    document.getElementById('process-stack').innerHTML = '';
    document.getElementById('memory').innerHTML = '';

    if(memory_size > 14) {
        alert('memory size > 14:' + memory_size);
        let max_partition = 7;
    }
    else {
        alert('memory size <= 14:' + memory_size);
        let max_partition = memory_size / 2;
    }

    document.getElementById('processes-opt').max = max_partition;
    document.getElementById('process-max').innerHTML = max_partition;
    document.getElementById('partitions-opt').max = max_partition;
    document.getElementById('part-max').innerHTML = max_partition;

}

function UpdatePartitions(id) {

    partitions = document.getElementById(id).value;
    document.getElementById('memory').innerHTML = '';
    memory_size = document.getElementById('memory-size').innerHTML;
    max_part_size = memory_size / 2;

    for(i = 0; i < partitions; i++) {
        max_part_size = AddPartition(max_part_size, i + 1);
    }
}

function UpdateProcesses(id) {

    processes = document.getElementById(id).value;
    document.getElementById('process-stack').innerHTML = '';
    memory_size = document.getElementById('memory-size').innerHTML;
    max_process_size = memory_size / 2;

    for(i = 0; i < processes; i++) {
        max_process_size = AddProcess(max_process_size, i + 1);
    }
}

function SwapIn(process_num, process_size) {

    const memory = document.getElementById('memory');

    const node = document.createElement('div')
    const node1 = document.createElement('input');
    node1.type = 'text';
    node1.readOnly = true;
    node1.value = 'P' + process_num + ':' + process_size;
    node1.id = 'swapped-process-' + process_num;

    node.appendChild(node1);
    node.className = 'partition';

    memory.appendChild(node);
    // alert('process swapped');
}

function FirstFit(type) {

    if(type == 'dynamic') {

        rem_memory_size = document.getElementById('memory-size').innerHTML;
        rem_memory_size = Number(rem_memory_size);
        processes = document.getElementById('processes').value;

        for(i = 0; i < processes; i++) {
            // alert('processes: ' + processes + '\niteration: ' + i);

            process_size = document.getElementById('process-' + (i + 1)).value;
            process_size = Number(process_size);
            // alert('process-' + (i + 1) + ' size: ' + process_size);

            if(rem_memory_size >= process_size) {
                SwapIn(i + 1, process_size);
                rem_memory_size = rem_memory_size - process_size;
                alert('rem_memory_size: ' + rem_memory_size);
            }

        }

    }
    else if(type == 'static') {
        // alert('static selected!');

        partitions = Number(document.getElementById('partitions').value);
        processes = Number(document.getElementById('processes').value);

        for(i = 0; i < processes; i++) {
            
            proc_size = document.getElementById('process-' + (i + 1)).value;
            proc_size = Number(proc_size);
            // alert('hello');
            for(j = 0; j < partitions; j++) {
                // alert('process ' + i + '\npartition ' + j)
                
                const partition = document.getElementById('partition-' + (j + 1));
                if(partition.readOnly == false) {

                    part_size = partition.value;
                    part_size = Number(part_size);
                    if(proc_size <= part_size) {
                        document.getElementById('partition-' + (j + 1)).value =
                        'P' + (i + 1) + ':' + proc_size;
                        document.getElementById('partition-' + (j + 1)).readOnly = 'true';
                        break;
                    }
                }
                // alert('last line of j');
            }
        }

        while(proc_num <= partitions && part_num <= partitions) {
            if(proc_size <= part_size) {
                document.getElementById('partition-' + part_num).value =
                'p' + proc_num + ':' + proc_size;
                proc_num++;
            }
            part_num++;
        }
    }
}

function CheckAlgo(id, type) {

    if(id == 'firstfit'){
        // alert('Algo: ' + id + '\nType: ' + type);
        FirstFit(type);
    }
    else if(id == 'nextfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        NextFit(type);
    }
    else if(id == 'bestfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        BestFit(type);
    }
    else if(id == 'worstfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        WorstFit(type);
    }
}

function CheckMemoryPartitionSize(id) {

    partitions = document.getElementById('partitions').value;
    memory_size = document.getElementById('memory-size').innerHTML;
    total_partition_size = 0;

    // Calculating total partition size
    for(i = 0; i < partitions; i++){
        size = document.getElementById('partition-' + (i + 1)).value;
        size = Number(size);
        total_partition_size += size;
    }

    // Checking total partition size and memory size equality
    if(total_partition_size != memory_size) {
        alert('Total partition size must be equal to memory size!');
    }
    else {
        CheckAlgo(id, 'static');
    }

} 

function CheckType(id) {

    static = document.getElementById('static').checked;

    // Checking type (static/dynamic)
    if(static == true) {
        // alert('static true!');
        CheckMemoryPartitionSize(id);
    }
    else if (static == false) {
        // alert('dynamic true!');
        CheckAlgo(id, 'dynamic');
    }
}

    












// COMMENTED EXTRA CODE

    // const techniqueName = document.getElementById(id).id;
    // output.style.textAlign = "right";
    // alert(output.style.backgroundColor);
    // document.getElementsByClassName('output').innerHTML = 'asdsdasd';



